import { Transition } from "@headlessui/react";
import { ArrowsPointingOutIcon } from "@heroicons/react/24/outline";
import React, { FC } from "react";
import toast from "react-hot-toast";
import { Link, useHistory } from "react-router-dom";
import ButtonPrimary from "shared/Button/ButtonPrimary";
import ButtonSecondary from "shared/Button/ButtonSecondary";
import NcImage from "shared/NcImage/NcImage";
import BagIcon from "./BagIcon";
import LikeButton from "./LikeButton";
import ModalQuickView from "./ModalQuickView";
import Prices from "./Prices";
import ProductStatus from "./ProductStatus";

export interface ProductCardProps {
  className?: string;
  data?: any;
  isLiked?: boolean;
}

const ProductCardMy: FC<ProductCardProps> = ({
  className = "",
  data,
  isLiked,
}) => {
  
  const {
    name,
    old_price,
    platform,
    price_now,
    variants,
    variantType,
    offer_percentage,
    image_name,
    backend_image_url,
    rating
  } = data;



  const [variantActive, setVariantActive] = React.useState(0);
  const [showModalQuickView, setShowModalQuickView] = React.useState(false);

  const history = useHistory();

  const notifyAddTocart = ({ size }: { size?: string }) => {
    toast.custom(
      (t) => (
        <Transition
          appear
          show={t.visible}
          className="p-4 max-w-md w-full bg-white dark:bg-slate-800 shadow-lg rounded-2xl pointer-events-auto ring-1 ring-black/5 dark:ring-white/10 text-slate-900 dark:text-slate-200"
          enter="transition-all duration-150"
          enterFrom="opacity-0 translate-x-20"
          enterTo="opacity-100 translate-x-0"
          leave="transition-all duration-150"
          leaveFrom="opacity-100 translate-x-0"
          leaveTo="opacity-0 translate-x-20"
        >
          <p className="block text-base font-semibold leading-none">
            Added to cart!
          </p>
          <div className="border-t border-slate-200 dark:border-slate-700 my-4" />
          {renderProductCartOnNotify({ size })}
        </Transition>
      ),
      { position: "top-right", id: "nc-product-notify", duration: 3000 }
    );
  };

  const renderProductCartOnNotify = ({ size }: { size?: string }) => {
    return (
      <div className="flex ">
        <div className="h-24 w-20 flex-shrink-0 overflow-hidden rounded-xl bg-slate-100">
          <img
            src={backend_image_url}
            alt={name}
            className="h-full w-full object-cover object-center"
          />
        </div>

        <div className="ml-4 flex flex-1 flex-col">
          <div>
            <div className="flex justify-between ">
              <div>
                <h3 className="text-base font-medium ">{name}</h3>
                <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                  <span>
                    {variants ? variants[variantActive].name : `Natural`}
                  </span>
                  <span className="mx-2 border-l border-slate-200 dark:border-slate-700 h-4"></span>
                  <span>{size || "XL"}</span>
                </p>
              </div>
              <Prices price={price_now} className="mt-0.5" />
            </div>
          </div>
          <div className="flex flex-1 items-end justify-between text-sm">
            <p className="text-gray-500 dark:text-slate-400">Qty 1</p>

            <div className="flex">
              <button
                type="button"
                className="font-medium text-primary-6000 dark:text-primary-500 "
                onClick={(e) => {
                  e.preventDefault();
                  history.push("cart");
                }}
              >
                View cart
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const getBorderClass = (Bgclass = "") => {
    if (Bgclass.includes("red")) {
      return "border-red-500";
    }
    if (Bgclass.includes("violet")) {
      return "border-violet-500";
    }
    if (Bgclass.includes("orange")) {
      return "border-orange-500";
    }
    if (Bgclass.includes("green")) {
      return "border-green-500";
    }
    if (Bgclass.includes("blue")) {
      return "border-blue-500";
    }
    if (Bgclass.includes("sky")) {
      return "border-sky-500";
    }
    if (Bgclass.includes("yellow")) {
      return "border-yellow-500";
    }
    return "border-transparent";
  };

  const renderGroupButtons = () => {
    return (
      <div className="absolute bottom-0 group-hover:bottom-4 inset-x-1 flex justify-center opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
        <ButtonSecondary
          className="ml-1.5 bg-white hover:!bg-gray-100 hover:text-slate-900 transition-colors shadow-lg"
          fontSize="text-xs"
          sizeClass="py-2 px-4"
          onClick={() => setShowModalQuickView(true)}
        >
          <ArrowsPointingOutIcon className="w-3.5 h-3.5" />
          <span className="ml-1">Quick view</span>
        </ButtonSecondary>
      </div>
    );
  };
  return (
    <>
      <div
        className={`nc-ProductCard relative flex flex-col bg-transparent ${className}`}
        data-nc-id="ProductCard"
      >
        <Link to={{pathname:`/product-detail/${data.id}/${name}`,state:data}} className="absolute inset-0"></Link>

        <div className="relative flex-shrink-0 bg-slate-50 dark:bg-slate-300 rounded-3xl overflow-hidden z-1 group">
          <Link to={{pathname:`/product-detail/${data.id}/${name}`,state:data}} className="block">
            <NcImage
              containerClassName="flex aspect-w-11 aspect-h-14 w-full h-0"
              src={backend_image_url}
              className="object-cover w-full h-full drop-shadow-xl"
            />
          </Link>

          <ProductStatus status={offer_percentage} />

          <LikeButton liked={isLiked} className="absolute top-3 right-3 z-10" />

          {renderGroupButtons()}
        </div>

        <div className="space-y-4 px-2.5 pt-5 pb-2.5">
          {/* {renderVariants()} */}

          <div>
            <h2
              className={`nc-ProductCard__title text-base font-semibold transition-colors line-clamp-4 hover:line-clamp-1`}
            >
              {name}
            </h2>
            <p className={`text-sm text-slate-500 dark:text-slate-400 mt-1 `} style={{textTransform: 'capitalize'}}>
              <img src={require("../icons/amazon.ico")} style={{height:'1rem', display:'inline', paddingRight:'.5rem'}}></img>
              {platform}
            </p>
          </div>

          {/* <div className="flex justify-between items-end "> */}
          <div className="flex items-end ">
            <Prices price={price_now} />
            <span style={{textDecoration:'line-through', paddingLeft:'.5rem', paddingBottom:'.1rem'}}>₹{old_price}</span>
          </div>
        </div>
      </div>

      {/* QUICKVIEW */}
      <ModalQuickView
        show={showModalQuickView}
        onCloseModalQuickView={() => setShowModalQuickView(false)}
        product_data={data}
      />
    </>
  );
};

export default ProductCardMy;
