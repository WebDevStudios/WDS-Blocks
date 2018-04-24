<?php

/**
 * Server-side rendering of the `wds/recent-posts` block.
 *
 * @package gutenberg
 */

namespace WDS\Gutenberg\blocks\recent_posts;

/**
 * Renders the `wds/recent-posts` block on server.
 *
 * @param array $attributes The block attributes.
 *
 * @return string Returns the post content with recent posts added.
 */
function render_block( $attributes ) {

	$recent_posts = wp_get_recent_posts(array(
		'numberposts' => $attributes['postsToShow'],
		'post_status' => 'publish',
		'order' => $attributes['order'],
		'orderby' => $attributes['orderBy'],
		'category' => $attributes['categories'],
	));

	$list_items_markup = '';

	foreach ($recent_posts as $post) {
		$post_id = $post['ID'];

		$title = get_the_title($post_id);
		if (!$title) {
			$title = __('(Untitled)', 'gutenberg');
		}
		$list_items_markup .= sprintf(
			'<li><a href="%1$s">%2$s</a>',
			esc_url(get_permalink($post_id)),
			esc_html($title)
		);

		if (isset($attributes['displayPostDate']) && $attributes['displayPostDate']) {
			$list_items_markup .= sprintf(
				'<time datetime="%1$s" class="wp-block-wds-recent-posts__post-date">%2$s</time>',
				esc_attr(get_the_date('c', $post_id)),
				esc_html(get_the_date('', $post_id))
			);
		}

		$list_items_markup .= "</li>\n";
	}

	$class = "align{$attributes['align']}";
	if (isset($attributes['postLayout']) && 'grid' === $attributes['postLayout']) {
		$class .= ' is-grid';
	}

	if (isset($attributes['columns']) && 'grid' === $attributes['postLayout']) {
		$class .= ' columns-' . $attributes['columns'];
	}

	$block_content = sprintf(
		'<ul class="%1$s">%2$s</ul>',
		esc_attr($class),
		$list_items_markup
	);

	ob_start();
	?>

	<!-- wp:wds/recent-posts -->
	<section class="wp-block-wds-recent-posts">
	<?php \WDS\Gutenberg\template_tags\block_container_options\display_block_options( $attributes ); ?>

		<?php \WDS\Gutenberg\components\block_title\display_block_title( $attributes );

		echo $block_content;
		?>

	</section>
	<!-- /wp:wds/recent-posts -->

	<?php
	return ob_get_clean();
}

/**
 * Registers the `wds/recent-posts` block on server.
 */
function register_block() {

	// Required to render output in editor.
	register_block_type('wds/recent-posts', array(
		'attributes' => array(
			'categories' => array(
				'type' => 'string',
			),
			'postsToShow' => array(
				'type' => 'number',
				'default' => 5,
			),
			'displayPostDate' => array(
				'type' => 'boolean',
				'default' => false,
			),
			'postLayout' => array(
				'type' => 'string',
				'default' => 'list',
			),
			'columns' => array(
				'type' => 'number',
				'default' => 3,
			),
			'align' => array(
				'type' => 'string',
				'default' => 'center',
			),
			'order' => array(
				'type' => 'string',
				'default' => 'desc',
			),
			'orderBy' => array(
				'type' => 'string',
				'default' => 'date',
			),
			'blockTitle' => array(
				'type' => 'string'
			),
			'backgroundType' => array(
				'type' => 'string'
			),
			'backgroundImage' => array(
				'type' => 'object'
			),
			'backgroundVideo' => array(
				'type' => 'object'
			),
			'backgroundColor' => array(
				'type' => 'string'
			),
			'animationType' => array(
				'type' => 'string'
			),
			'textColor' => array(
				'type' => 'string'
			),
		),
		'render_callback' => __NAMESPACE__ . '\\render_block',
	));
}

add_action( 'init', __NAMESPACE__ . '\\register_block' );