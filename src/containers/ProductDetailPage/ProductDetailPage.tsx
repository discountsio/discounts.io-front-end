import {
  ClockIcon,
  NoSymbolIcon,
  SparklesIcon,
} from "@heroicons/react/24/outline";
import { StarIcon } from "@heroicons/react/24/solid";
import BagIcon from "components/BagIcon";
import IconDiscount from "components/IconDiscount";
import LikeButton from "components/LikeButton";
import Prices from "components/Prices";
import SectionSliderProductCard from "components/SectionSliderProductCard";
import { PRODUCTS } from "data/data";
import { FC } from "react";
import { useLocation } from 'react-router-dom';
import ButtonPrimary from "shared/Button/ButtonPrimary";
import AccordionInfo from "./AccordionInfo";
import Policy from "./Policy";

export interface ProductDetailPageProps {
  className?: string;
  data?:any;
}

const ProductDetailPage: FC<ProductDetailPageProps> = ({ className = "", data={} }) => {
  const {  status } = PRODUCTS[0];

  data=useLocation().state;
  console.log(data)

  const renderStatus = () => {
    if (!status) {
      return null;
    }
    const CLASSES =
      "px-2.5 py-1.5 text-xs bg-white dark:bg-slate-900 nc-shadow-lg rounded-full flex items-center justify-center text-slate-900 text-slate-900 dark:text-slate-300";
      
    if (typeof(data.offer_percentage) === "number") {
      let offer_class = ''
      if(data.offer_percentage > 70){
        offer_class = 'offer_percentage_red'
      } else if(data.offer_percentage > 30){
        offer_class = 'offer_percentage_orange'
      } else {
        offer_class = 'offer_percentage_green'
      }
      return (
        <div className={`${CLASSES} ${offer_class}`}>
          <span className={`m-1.5 text-base leading-none`}>{data.offer_percentage}% offer</span>
        </div>
      );
    }
    return null;
  };

  const renderSectionContent = () => {
    return (
      <div className="space-y-7 2xl:space-y-8">
        {/* ---------- 1 HEADING ----------  */}
        <div>
          <h2 className="text-2xl sm:text-3xl font-semibold">
             {data.name}
          </h2>

          

          <div className="flex items-center mt-5 space-x-4 sm:space-x-5">
            {/* <div className="flex text-xl font-semibold">$112.00</div> */}
            {renderStatus()}

            <div className="h-7 border-l border-slate-300 dark:border-slate-700"></div>

            <Prices
              contentClass="py-1 px-2 md:py-1.5 md:px-3 text-lg font-semibold"
              price={data.price_now}
            />
            
            <span className={"text-base font-normal"} style={{textDecoration:'line-through', paddingLeft:'.5rem', paddingBottom:'.1rem'}}>₹{data.old_price}</span>

            <div className="h-7 border-l border-slate-300 dark:border-slate-700"></div>

            <div className="flex items-center">
              <a
                href="#reviews"
                className="flex items-center text-sm font-medium"
              >
                <StarIcon className="w-5 h-5 pb-[1px] text-yellow-400" />
                <div className="ml-1.5 flex">
                  <span>{data.rating}</span>
                </div>
              </a>
              {/* <span className="hidden sm:block mx-2.5">·</span>
              <div className="hidden sm:flex items-center text-sm">
                <SparklesIcon className="w-3.5 h-3.5" />
                <span className="ml-1 leading-none">{status}</span>
              </div> */}
            </div>
          </div>
        </div>
        <div className="flex space-x-3.5">
          <ButtonPrimary
            className="flex-1 flex-shrink-0"
            onClick={() =>  {window.open(data.url,"_blank")}}
          >
            <BagIcon className="hidden sm:inline-block w-5 h-5 mb-0.5" />
            <span className="ml-3">Buy Product</span>
          </ButtonPrimary>
        </div>

        {/*  */}
        <hr className=" 2xl:!my-10 border-slate-200 dark:border-slate-700"></hr>
        {/*  */}

        {/* ---------- 5 ----------  */}
        <AccordionInfo data={{name:"Description",content:data.description}}/>

      </div>
    );
  };

  return (
    <div className={`nc-ProductDetailPage ${className}`}>
      {/* MAIn */}
      <main className="container mt-5 lg:mt-11">
        <div className="lg:flex">
          {/* CONTENT */}
          <div className="w-full lg:w-[55%] ">
            {/* HEADING */}
            <div className="relative">
              <div className="aspect-w-16 aspect-h-16">
                <img
                  src={data.backend_image_url}
                  className="w-full rounded-2xl object-cover"
                  alt="product detail 1"
                />
              </div>
              {/* {renderStatus()} */}
              {/* META FAVORITES */}
              <LikeButton className="absolute right-3 top-3 " />
            </div>
          </div>

          {/* SIDEBAR */}
          <div className="w-full lg:w-[45%] pt-10 lg:pt-0 lg:pl-7 xl:pl-9 2xl:pl-10">
            {renderSectionContent()}
          </div>
        </div>

        {/* DETAIL AND REVIEW */}
        <div className="mt-12 sm:mt-16 space-y-10 sm:space-y-16">

          {/* OTHER SECTION */}
          {/* <SectionSliderProductCard
            heading="Customers also purchased"
            subHeading=""
            headingFontClassName="text-2xl font-semibold"
            headingClassName="mb-10 text-neutral-900 dark:text-neutral-50"
          /> */}

          {/* SECTION */}
          {/* <div className="pb-20 xl:pb-28 lg:pt-14">
            <SectionPromo2 />
          </div> */}
        </div>
      </main>

    </div>
  );
};

export default ProductDetailPage;
