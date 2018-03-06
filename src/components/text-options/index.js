/**
 * WordPress dependencies
 */
const { __ } = wp.i18n;
const { ColorPalette } = wp.blocks;
const {
	PanelBody,
	PanelColor,
	PanelRow,
} = wp.components;

/**
 * Internal dependencies
 */
import TextOptionsAttributes from './attributes';
import TextOptionsInlineStyles from './inline-styles';
import './editor.scss';

// Export for ease of importing in individual blocks.
export {
	TextOptionsAttributes,
	TextOptionsInlineStyles,
};

function TextOptions( props ) {
	const setTextColor = value => props.setAttributes( { textColor: value } );

	return (
		<PanelBody
			title={ __( 'Text Options' ) }
			className="wds-text-options"
		>
			<PanelRow>
				<div className="wds-text-option">
					<p>
						<PanelColor
							title={ __( 'Text Color' ) }
							colorValue={ props.attributes.textColor }
						>
							<ColorPalette
								value={ props.attributes.textColor }
								onChange={ setTextColor }
							/>
						</PanelColor>
					</p>
					<p>
						{ __( 'Change the text color of this block.' ) }
					</p>
				</div>
			</PanelRow>
		</PanelBody>
	);
}

export default TextOptions;
