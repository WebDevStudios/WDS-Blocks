/**
 * External dependencies
 */
import _get from 'lodash/get';
import _isUndefined from 'lodash/isUndefined';
import _pickBy from 'lodash/pickBy';

import moment from 'moment';
import classnames from 'classnames';
import { stringify } from 'querystringify';

/**
 * WordPress dependencies
 */
const { Component } = wp.element;

const {
	PanelBody,
	Placeholder,
	SelectControl,
	RangeControl,
	Spinner,
	ToggleControl,
	Toolbar,
	withAPIData,
} = wp.components;
const { __ } = wp.i18n;
const { decodeEntities } = wp.utils;

const {
	InspectorControls,
	BlockControls,
	BlockAlignmentToolbar,
} = wp.blocks;

/**
 * Internal dependencies
 */
import './editor.scss';
import './style.scss';

const MAX_POSTS_COLUMNS = 6;
const DEFAULT_COLUMNS = 3;

// Import our Block Title component.
import BlockTitle from '../../components/block-title';

// Import our Block Title component.
import MultiSelect from '../../components/multiselect';

// Import all of our Background Options requirements.
import BackgroundOptions, { BackgroundOptionsClasses, BackgroundOptionsInlineStyles, BackgroundOptionsVideoOutput } from '../../components/background-options';

// Import all of our Text Options requirements.
import TextOptions, { TextOptionsInlineStyles } from '../../components/text-options';

// Import all of our Other Options requirements.
import OtherOptions, { OtherOptionsClasses } from '../../components/other-options';

const DEFAULT_MIN_ITEMS = 1;
const DEFAULT_MAX_ITEMS = 100;

class RecentPostsBlock extends Component {
	constructor() {
		super( ...arguments );

		this.toggleDisplayPostDate = this.toggleDisplayPostDate.bind( this );
	}

	toggleDisplayPostDate() {
		const { displayPostDate } = this.props.attributes;
		const { setAttributes } = this.props;

		setAttributes( { displayPostDate: ! displayPostDate } );
	}

	onOrderChange = ( value ) => this.props.setAttributes( { order: value } )

	onOrderByChange = ( value ) => this.props.setAttributes( { orderBy: value } )

	// onCategoryChange = ( value ) => this.props.setAttributes( { categories: '' !== value ? value : undefined } )

	onCategoryChange = value => {
		console.log( value );
	}

	onNumberOfItemsChange = ( value ) => this.props.setAttributes( { postsToShow: value } )

	render() {
		const maxItems = DEFAULT_MAX_ITEMS;
		const minItems = DEFAULT_MIN_ITEMS;
		const latestPosts = this.props.latestPosts.data;
		const { attributes, categoriesList, setAttributes } = this.props;
		const { displayPostDate, align, postLayout, columns, order, orderBy, categories, postsToShow } = attributes;

		const inspectorControls = !! this.props.focus && (
			<InspectorControls key="inspector">
				<PanelBody title={ __( 'Latest Posts Settings' ) }>
					{
						( this.onOrderChange && this.onOrderByChange ) && (
							<SelectControl
								key="query-controls-order-select"
								label={ __( 'Order by' ) }
								value={ `${ orderBy }/${ order }` }
								options={ [
									{
										label: __( 'Newest to Oldest' ),
										value: 'date/desc',
									},
									{
										label: __( 'Oldest to Newest' ),
										value: 'date/asc',
									},
									{
										/* translators: label for ordering posts by title in ascending order */
										label: __( 'A → Z' ),
										value: 'title/asc',
									},
									{
										/* translators: label for ordering posts by title in descending order */
										label: __( 'Z → A' ),
										value: 'title/desc',
									},
								] }
								onChange={ ( value ) => {
									const [ newOrderBy, newOrder ] = value.split( '/' );
									if ( newOrder !== order ) {
										this.onOrderChange( newOrder );
									}
									if ( newOrderBy !== orderBy ) {
										this.onOrderByChange( newOrderBy );
									}
								} }
							/>
						) }
					{ !! this.props.focus ? (
						<MultiSelect onCategoryChange={ this.onCategoryChange } />
					) : ( null ) }
					{
						this.onNumberOfItemsChange && (
							<RangeControl
								key="query-controls-range-control"
								label={ __( 'Number of items' ) }
								value={ postsToShow }
								onChange={ this.onNumberOfItemsChange }
								min={ minItems }
								max={ maxItems }
							/>
						)
					}
					<ToggleControl
						label={ __( 'Display post date' ) }
						checked={ displayPostDate }
						onChange={ this.toggleDisplayPostDate }
					/>
					{ postLayout === 'grid' &&
						<RangeControl
							label={ __( 'Columns' ) }
							value={ columns || DEFAULT_COLUMNS }
							onChange={ ( value ) => setAttributes( { columns: value } ) }
							min={ 2 }
							max={ ! hasPosts ? MAX_POSTS_COLUMNS : Math.min( MAX_POSTS_COLUMNS, latestPosts.length ) }
						/>
					}
				</PanelBody>
				<BackgroundOptions
					{ ...this.props }
				/>
				<TextOptions
					{ ...this.props }
				/>
				<OtherOptions
					{ ...this.props }
				/>
			</InspectorControls>
		);

		const hasPosts = Array.isArray( latestPosts ) && latestPosts.length;
		if ( ! hasPosts ) {
			return [
				inspectorControls,
				<Placeholder key="placeholder"
					icon="admin-post"
					label={ __( 'Recent Posts' ) }
				>
					{ ! Array.isArray( latestPosts ) ?
						<Spinner /> :
						__( 'No posts found.' )
					}
				</Placeholder>,
			];
		}

		// Removing posts from display should be instant.
		const displayPosts = latestPosts.length > postsToShow ?
			latestPosts.slice( 0, postsToShow ) :
			latestPosts;

		const layoutControls = [
			{
				icon: 'list-view',
				title: __( 'List View' ),
				onClick: () => setAttributes( { postLayout: 'list' } ),
				isActive: postLayout === 'list',
			},
			{
				icon: 'grid-view',
				title: __( 'Grid View' ),
				onClick: () => setAttributes( { postLayout: 'grid' } ),
				isActive: postLayout === 'grid',
			},
		];

		return [
			inspectorControls,
			!! this.props.focus && (
				<BlockControls key="controls">
					<BlockAlignmentToolbar
						value={ align }
						onChange={ ( nextAlign ) => {
							setAttributes( { align: nextAlign } );
						} }
						controls={ [ 'center', 'wide', 'full' ] }
					/>
					<Toolbar controls={ layoutControls } />
				</BlockControls>
			),
			<section
				key=""
				className={ classnames(
					this.props.className,
					...BackgroundOptionsClasses( this.props ),
					...OtherOptionsClasses( this.props ),
				) }
				style={ {
					...BackgroundOptionsInlineStyles( this.props ),
					...TextOptionsInlineStyles( this.props ),
				} }
			>
				{ BackgroundOptionsVideoOutput( this.props ) }

				<BlockTitle
					{ ...this.props }
				/>
				<ul
					className={ classnames( {
						'is-grid': postLayout === 'grid',
						[ `columns-${ columns }` ]: postLayout === 'grid',
					} ) }
					key="latest-posts"
				>
					{ displayPosts.map( ( post, i ) =>
						<li
							key={ i }
							style={ {
								...TextOptionsInlineStyles( this.props ),
							} }
						>
							<a href={ post.link } target="_blank">{ decodeEntities( post.title.rendered.trim() ) || __( '(Untitled)' ) }</a>
							{ displayPostDate && post.date_gmt &&
								<time dateTime={ moment( post.date_gmt ).utc().format() } className={ `${ this.props.className }__post-date` }>
									{ moment( post.date_gmt ).local().format( 'MMMM DD, Y' ) }
								</time>
							}
						</li>
					) }
				</ul>
			</section>,
		];
	}
}

export default withAPIData( ( props ) => {
	const { postsToShow, order, orderBy, categories } = props.attributes;
	const latestPostsQuery = stringify( _pickBy( {
		categories, // [1, 2]
		order,
		orderBy,
		per_page: postsToShow,
		_fields: [ 'date_gmt', 'link', 'title' ],
	}, value => ! _isUndefined( value ) ) );
	const categoriesListQuery = stringify( {
		per_page: 100,
		_fields: [ 'id', 'name', 'parent' ],
	} );
	return {
		latestPosts: `/wp/v2/posts?${ latestPostsQuery }`,
		categoriesList: `/wp/v2/categories?${ categoriesListQuery }`,
	};
} )( RecentPostsBlock );