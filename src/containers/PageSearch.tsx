import HeaderFilterSearchPage from "components/HeaderFilterSearchPage";
import ProductCardMy from "components/ProductCardMy";
import { FC, useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import ButtonCircle from "shared/Button/ButtonCircle";
import Input from "shared/Input/Input";
import Pagination from "shared/Pagination/Pagination";


export interface PageSearchProps {
  className?: string;
}

const PageSearch: FC<PageSearchProps> = ({ className = "" }) => {
  // Fetch data from backend
  const [products_data, set_products_data] = useState([]);
  const [page_limit, set_page_limit] = useState(12);
  const [current_page, set_current_page] = useState(0);
  const [total_pages, set_total_pages] = useState(1);
  const [sort_key, set_sort_key] = useState("offer_percentage:DESC")

  useEffect(() => {
    fetch(`http://localhost:1337/mains/count`)
      .then((response) => response.json())
      .then((data) => set_total_pages(data % page_limit == 0 ? data / page_limit : (Math.floor(data / page_limit) + 1)));

    fetch(`http://localhost:1337/mains?_start=${page_limit * current_page}&_limit=${page_limit}&_sort=${sort_key}`)
      .then((response) => response.json())
      .then((data) => set_products_data(data));
  }, []);

  console.log(products_data)

  useEffect(() => {
    fetch(`http://localhost:1337/mains?_start=${page_limit * current_page}&_limit=${page_limit}&_sort=${sort_key}`)
      .then((response) => response.json())
      .then((data) => set_products_data(data));
  }, [current_page, sort_key]);

  return (
    <div className={`nc-PageSearch  ${className}`} data-nc-id="PageSearch">
      <Helmet>
        <title>Discounts.io - Search</title>
      </Helmet>

      <div
        className={`nc-HeadBackgroundCommon h-24 2xl:h-28 top-0 left-0 right-0 w-full bg-primary-50 dark:bg-neutral-800/20 `}
        data-nc-id="HeadBackgroundCommon"
        style={{"backgroundColor":"#ff5757"}}
      />
      <div className="container">
        <header className="max-w-2xl mx-auto -mt-10 flex flex-col lg:-mt-7">
          <form className="relative w-full " method="post">
            <label
              htmlFor="search-input"
              className="text-neutral-500 dark:text-neutral-300"
            >
              <span className="sr-only">Search all icons</span>
              <Input
                className="shadow-lg border-0 dark:border"
                id="search-input"
                type="search"
                placeholder="Type your keywords"
                sizeClass="pl-14 py-5 pr-5 md:pl-16"
                rounded="rounded-full"
              />
              <ButtonCircle
                className="absolute right-2.5 top-1/2 transform -translate-y-1/2"
                size=" w-11 h-11"
                type="submit"
              >
                <i className="las la-arrow-right text-xl"></i>
              </ButtonCircle>
              <span className="absolute left-5 top-1/2 transform -translate-y-1/2 text-2xl md:left-6">
                <svg
                  className="h-5 w-5"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M11.5 21C16.7467 21 21 16.7467 21 11.5C21 6.25329 16.7467 2 11.5 2C6.25329 2 2 6.25329 2 11.5C2 16.7467 6.25329 21 11.5 21Z"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M22 22L20 20"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
            </label>
          </form>
        </header>
      </div>

      <div className="container py-16 lg:pb-28 lg:pt-20 space-y-16 lg:space-y-28">
        <main>
          {/* FILTER */}
          <HeaderFilterSearchPage setSortKey={set_sort_key} />

          {/* LOOP ITEMS */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-10 mt-8 lg:mt-10">
            {products_data.map((item, index) => (
              <ProductCardMy data={item} key={index} />
            ))}
          </div>

          {/* PAGINATION */}
          <div className="flex flex-col mt-12 lg:mt-16 space-y-5 sm:space-y-0 sm:space-x-3 sm:flex-row sm:justify-around sm:items-center">
            <Pagination currentPage={current_page} setCurrentPage={set_current_page} totalPages={total_pages} />
          </div>
        </main>

      </div>
    </div>
  );
};

export default PageSearch;
