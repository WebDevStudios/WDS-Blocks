import { getColorClassName, InnerBlocks } from '@wordpress/block-editor';
import { getBlockDefaultClassName } from '@wordpress/blocks';
import Slide from './Components/Slide';
import { PREFIX } from '../../utils/config';

/**
 * The save function defines the way in which the different attributes should
 * be combined into the final markup, which is then serialized by the block
 * editor into `post_content`.
 *
 * @author WebDevStudios
 * @since  2.0.0
 * @see    https://developer.wordpress.org/block-editor/developers/block-api/block-edit-save/#save
 *
 * @param  {Object} [props] Properties passed from the editor.
 * @return {WPElement}      Element to render.
 */
export default function Save( props ) {
	const {
		attributes: {
			fontColor,
			customFontColor,
			backgroundType,
			backgroundColor,
			customBackgroundColor,
			backgroundImage,
			backgroundVideo,
		},
	} = props;

	const classes = [
			getBlockDefaultClassName( `${ PREFIX }/carousel-slide` ),
		],
		styles = {};

	// Add custom color classes.
	classes.push( fontColor || customFontColor ? 'has-text-color' : null );
	classes.push( fontColor ? getColorClassName( 'color', fontColor ) : null );
	classes.push(
		backgroundColor || customBackgroundColor ? 'has-background' : null
	);
	classes.push(
		'color' === backgroundType && backgroundColor
			? getColorClassName( 'background-color', backgroundColor )
			: null
	);

	// Add custom color styles.
	styles.color = customFontColor ? customFontColor : undefined;
	styles.backgroundColor =
		'color' === backgroundType && customBackgroundColor
			? customBackgroundColor
			: undefined;

	// Define props relating to block background settings.
	const backgroundProps = {
		backgroundType,
		backgroundColor,
		backgroundImage,
		backgroundVideo,
	};

	return (
		<Slide classes={ classes } styles={ styles } { ...backgroundProps }>
			<InnerBlocks.Content />
		</Slide>
	);
}
