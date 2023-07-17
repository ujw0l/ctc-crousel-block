import {useEffect,useRef} from 'react';
import { ToggleControl,PanelBody, Button, RangeControl } from '@wordpress/components';
import {ctcCarousel } from "ctc-carousel-js";

/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-i18n/
 */
import { __ } from '@wordpress/i18n';

/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-block-editor/#useblockprops
 */
import { useBlockProps,InspectorControls,MediaUpload,MediaUploadCheck} from '@wordpress/block-editor';

/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * Those files can contain any CSS code that gets applied to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */
import './editor.scss';

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#edit
 *
 * @return {WPElement} Element to render.
 */
export default function Edit({ clientId, attributes,setAttributes}) {


	let carouselRef =  useRef();

	useEffect(()=>{
let carDiv = document.querySelector('.ctcCarouselDiv');
if(null != carDiv){
	carDiv.remove();
}

	new ctcCarousel(`#${carouselRef.current.id}`,{ autoPlay:attributes.autoPlay,autoPlayInterval:parseInt(attributes.autoPlayInterval),autoPlaySelector:`#${carouselRef.current.id}`},{callBack:(el)=>el.style.opacity = '1'});	
	setAttributes({clntId:clientId})

	},[attributes.gallery,attributes.autoPlay,attributes.autoPlayInterval,attributes.carouselHeight,attributes.carouselWidth])

	return (
		<div { ...useBlockProps() } style={{height:'auto', width:'auto'}}>

{0< attributes.gallery.length && <div ref={carouselRef} id={`ctc-carousel-${clientId}`} style={{marginLeft: 'auto', marginRight:'auto', display:'block', opacity:'0',width:`${attributes.carouselWidth}px`, height:`${attributes.carouselHeight}px`}} className={`ctc-carousel ctc-carousel-${clientId}`}>
             { attributes.gallery.map((x,i)=> <img key={i} src={x.url} />) }
			</div>
}
			<div>
				<MediaUploadCheck>
					<MediaUpload
					 title = {__('Select/Update Images', 'ctc-carousel')}
					 multiple={ true}
					 value= {attributes.gallery.map(x => x.id)}
					 gallery= {true}
					 onSelect={ gal => setAttributes({ gallery: gal })}
						allowedTypes={['image']}
						render={({ open }) => (
							<div  style= {{ width: '100%', backgroundColor: 'rgba(255,255,,255,1)', color: 'rgb(61, 148, 218)', padding: '10px' }}>
							<Button style={{ marginLeft: 'auto', marginRight: 'auto', display: 'block', color: 'rgb(61, 148, 218)', border: '1px solid rgb(61, 148, 218)'}} className= {"ctc-gal-button dashicons-before dashicons-slides"}  onClick={open}>{  attributes.gallery.length > 1 ?  __(" Update  Gallery", "ctc-gal")  : __(" Select Images", "ctc-gal")}</Button>
						</div>
						)}
					/>
				</MediaUploadCheck> 
			</div>

 <div>
<InspectorControls>
<PanelBody>

<ToggleControl
			label={__("Autoplay", "ctc-carousel")}
			checked={attributes.autoPlay}
			onChange={val=> setAttributes({autoPlay:val})}				
/>
{
attributes.autoPlay && <> <RangeControl 
					label={ __('Autoplay Invertval (in micro seconds)', 'ctc-carousel')}
                    min= {500}
                    max= {10000}
                    onChange = { val => setAttributes({autoPlayInterval: val })}
                    value = {attributes.autoPlayInterval}
                    resetFallbackValue= {2000}
					/>
</>
}



<RangeControl 
					label={ __('Carousel Width (px)', 'ctc-carousel')}
                    min= {400}
                    max= {850}
                    onChange = { val => setAttributes({carouselWidth: val })}
                    value = {attributes.carouselWidth}
                    resetFallbackValue= {500}
					/>

<RangeControl 
					label={ __('Carousel Height (px)', 'ctc-carousel')}
                    min= {200}
                    max= {450}
                    onChange = { val => setAttributes({carouselHeight: val })}
                    value = {attributes.carouselHeight}
                    resetFallbackValue= {300}
					/>


</PanelBody>


</InspectorControls>

 </div>

		</div>
	);
}
