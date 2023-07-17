/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-block-editor/#useblockprops
 */
import { useBlockProps } from '@wordpress/block-editor';

/**
 * The save function defines the way in which the different attributes should
 * be combined into the final markup, which is then serialized by the block
 * editor into `post_content`.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#save
 *
 * @return {WPElement} Element to render.
 */
export default function save({attributes}) {
	return (
		<div { ...useBlockProps.save() }>
			{0< attributes.gallery.length && <div  id={`ctc-carousel-${attributes.clntId}`} data-autoplay-interval={attributes.autoPlayInterval} data-autoplay={attributes.autoPlay} style={{marginLeft: 'auto', marginRight:'auto', display:'block', opacity:'0',width:`${attributes.carouselWidth}px`, height:`${attributes.carouselHeight}px`}} className={`ctc-carousel ctc-carousel-${attributes.clntId}`}>
             { attributes.gallery.map((x,i)=> <img key={i} src={x.url} />) }
			</div>
}
		</div>
	);
}
