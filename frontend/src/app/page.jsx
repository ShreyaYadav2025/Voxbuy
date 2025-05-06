import React from 'react'
import { FaInstagram, FaPinterest, FaTwitter } from 'react-icons/fa6';

const Home = () => {
  return (
    <div className="bg-black">
      {/* hero - start */}
      <div className="bg-gradient-to-b from-black via-maroon-900 to-rose-900 pb-6 sm:pb-8 lg:pb-12">
        <section className="mx-auto max-w-screen-2xl px-4 md:px-8">
          <div className="mb-8 flex flex-wrap justify-between md:mb-16">
            <div className="mb-6 flex w-full flex-col justify-center sm:mb-12 lg:mb-0 lg:w-1/3 lg:pb-24 lg:pt-48">
              <h1 className="mb-4 text-4xl font-bold text-white sm:text-5xl md:mb-8 md:text-6xl">
                Discover Your
                <br />
                <span className="bg-gradient-to-r from-rose-400 to-maroon-500 bg-clip-text text-transparent">
                  Perfect Style
                </span>
              </h1>
              <p className="max-w-md leading-relaxed text-gray-300 xl:text-lg">
                Explore our curated collection of trendsetting fashion. From casual comfort to elegant statements, find pieces that define your unique style.
              </p>
              <div className="mt-8 flex gap-4">
                <a href="/browseproduct" className="inline-block rounded-lg bg-rose-600 px-8 py-3 text-center text-sm font-semibold text-white outline-none ring-rose-300 transition duration-100 hover:bg-rose-700 focus-visible:ring active:bg-rose-800 md:text-base">
                  Shop Now
                </a>
                <a href="/about" className="inline-block rounded-lg bg-gray-800 px-8 py-3 text-center text-sm font-semibold text-gray-300 outline-none ring-rose-300 transition duration-100 hover:bg-gray-700 focus-visible:ring active:text-gray-200 md:text-base">
                  Learn More
                </a>
              </div>
            </div>
            <div className="mb-12 flex w-full md:mb-16 lg:w-2/3 ">
              <div className="relative left-12 top-12 z-10 -ml-12 overflow-hidden rounded-lg bg-gray-900 shadow-lg md:left-16 md:top-16 lg:ml-0">
                <img
                  src="https://images.unsplash.com/photo-1542340916-951bb72c8f74?auto=format&q=75&fit=crop&w=550&h=550"
                  loading="lazy"
                  alt="Photo by Kaung Htet"
                  className="h-full w-full object-cover object-center transition duration-200 hover:scale-110"
                />
              </div>
              <div className="overflow-hidden rounded-lg bg-gray-900 shadow-lg">
                <img
                  src="https://images.unsplash.com/photo-1586295166487-b265f7e83a7f?auto=format&q=75&fit=crop&w=550&h=550"
                  loading="lazy"
                  alt="Photo by Manny Moreno"
                  className="h-full w-full object-cover object-center transition duration-200 hover:scale-110"
                />
              </div>
            </div>
          </div>

          {/* Categories Bar */}
          <div className="flex flex-col items-center justify-between gap-8 md:flex-row">
            <div className="flex h-12 w-64 divide-x divide-gray-700 overflow-hidden rounded-lg border-2 border-rose-600">
              <a
                href="/browseproduct?category=men"
                className="flex w-1/3 items-center justify-center bg-gray-900 text-gray-300 transition duration-100 hover:bg-rose-900 active:bg-rose-800"
              >
                Men
              </a>
              <a
                href="/browseproduct?category=women"
                className="flex w-1/3 items-center justify-center bg-gray-900 text-gray-300 transition duration-100 hover:bg-rose-900 active:bg-rose-800"
              >
                Women
              </a>
              <a
                href="/browseproduct?category=kids"
                className="flex w-1/3 items-center justify-center bg-gray-900 text-gray-300 transition duration-100 hover:bg-rose-900 active:bg-rose-800"
              >
                Kids
              </a>
            </div>

            {/* social - start */}
            <div className="flex items-center justify-center gap-4 lg:justify-start">
              <span className="text-sm font-semibold uppercase tracking-widest text-gray-500 sm:text-base">
                Social
              </span>
              <span className="h-px w-12 bg-gray-700" />
              <div className="flex gap-4">
                <a
                  href="https://www.instagram.com/ayushman_111202_"
                  target="_blank"
                  className="text-gray-500 transition duration-100 hover:text-gray-400 active:text-gray-300"
                >
                  <FaInstagram size={20} color='gray' />
                </a>
                <a
                  href="#"
                  target="_blank"
                  className="text-gray-500 transition duration-100 hover:text-gray-400 active:text-gray-300"
                >
                  <FaTwitter size={20} color='gray' />
                </a>
                <a
                  href="#"
                  target="_blank"
                  className="text-gray-500 transition duration-100 hover:text-gray-400 active:text-gray-300"
                >
                  <FaPinterest size={20} color='gray' />
                </a>

              </div>
            </div>
            {/* social - end */}
          </div>
        </section>
      </div>

      {/* Featured Products */}
      <div className="bg-black py-6 bg-gradient-to-r from-maroon-900 via-rose-900 to-rose-700 sm:py-8 lg:py-12">
        <div className="mx-auto max-w-screen-2xl px-4 md:px-8">
          <div className="mb-10 md:mb-16">
            <h2 className="mb-4 text-center text-2xl font-bold text-white md:mb-6 lg:text-3xl">
              Featured Collections
            </h2>
            <p className="mx-auto max-w-screen-md text-center text-gray-300 md:text-lg">
              Discover our handpicked selection of trending styles and must-have pieces for this season.
            </p>
          </div>

          <div className="grid gap-x-4 gap-y-8 sm:grid-cols-2 md:gap-x-6 lg:grid-cols-3 xl:grid-cols-4">
            {/* Product Cards */}
            <div className="group relative">
              <div className="relative mb-2 overflow-hidden rounded-lg bg-gray-900">
                <img
                  src="https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?auto=format&q=75&fit=crop&crop=top&w=600&h=700"
                  loading="lazy"
                  alt="Photo by Austin Wade"
                  className="h-96 w-full object-cover object-center transition duration-200 group-hover:scale-110"
                />
                <div className="absolute bottom-2 left-0 flex gap-2">
                  <span className="rounded-r-lg bg-rose-600 px-3 py-1.5 text-sm font-semibold uppercase tracking-wider text-white">
                    -50%
                  </span>
                  <span className="rounded-lg bg-gray-800 px-3 py-1.5 text-sm font-bold uppercase tracking-wider text-white">
                    New
                  </span>
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 transition-opacity group-hover:opacity-100"></div>
              </div>
              <div className="flex items-start justify-between gap-2 px-2">
                <div className="flex flex-col">
                  <a
                    href="#"
                    className="text-lg font-bold text-white transition duration-100 hover:text-gray-300 lg:text-xl"
                  >
                    Fancy Outfit
                  </a>
                  <span className="text-gray-400">by Fancy Brand</span>
                </div>
                <div className="flex flex-col items-end">
                  <span className="font-bold text-gray-300 lg:text-lg">$19.99</span>
                  <span className="text-sm text-rose-500 line-through">$39.99</span>
                </div>
              </div>
            </div>
            <div className="group relative">
              <div className="relative mb-2 overflow-hidden rounded-lg bg-gray-900">
                <img
                  src="https://images.unsplash.com/photo-1523359346063-d879354c0ea5?auto=format&q=75&fit=crop&crop=top&w=600&h=700"
                  loading="lazy"
                  alt="Photo by Nick Karvounis"
                  className="h-96 w-full object-cover object-center transition duration-200 group-hover:scale-110"
                />
              </div>
              <div className="flex items-start justify-between gap-2 px-2">
                <div className="flex flex-col">
                  <a
                    href="#"
                    className="text-lg font-bold text-white transition duration-100 hover:text-gray-300 lg:text-xl"
                  >
                    Cool Outfit
                  </a>
                  <span className="text-gray-400">by Cool Brand</span>
                </div>
                <div className="flex flex-col items-end">
                  <span className="font-bold text-gray-300 lg:text-lg">$29.99</span>
                </div>
              </div>
            </div>
            <div className="group relative">
              <div className="relative mb-2 overflow-hidden rounded-lg bg-gray-900">
                <img
                  src="https://images.unsplash.com/photo-1548286978-f218023f8d18?auto=format&q=75&fit=crop&crop=top&w=600&h=700"
                  loading="lazy"
                  alt="Photo by Austin Wade"
                  className="h-96 w-full object-cover object-center transition duration-200 group-hover:scale-110"
                />
              </div>
              <div className="flex items-start justify-between gap-2 px-2">
                <div className="flex flex-col">
                  <a
                    href="#"
                    className="text-lg font-bold text-white transition duration-100 hover:text-gray-300 lg:text-xl"
                  >
                    Nice Outfit
                  </a>
                  <span className="text-gray-400">by Nice Brand</span>
                </div>
                <div className="flex flex-col items-end">
                  <span className="font-bold text-gray-300 lg:text-lg">$35.00</span>
                </div>
              </div>
            </div>
            <div className="group relative">
              <div className="relative mb-2 overflow-hidden rounded-lg bg-gray-900">
                <img
                  src="https://images.unsplash.com/photo-1566207274740-0f8cf6b7d5a5?auto=format&q=75&fit=crop&crop=top&w=600&h=700"
                  loading="lazy"
                  alt="Photo by Vladimir Fedotov"
                  className="h-96 w-full object-cover object-center transition duration-200 group-hover:scale-110"
                />
              </div>
              <div className="flex items-start justify-between gap-2 px-2">
                <div className="flex flex-col">
                  <a
                    href="#"
                    className="text-lg font-bold text-white transition duration-100 hover:text-gray-300 lg:text-xl"
                  >
                    Lavish Outfit
                  </a>
                  <span className="text-gray-400">by Lavish Brand</span>
                </div>
                <div className="flex flex-col items-end">
                  <span className="font-bold text-gray-300 lg:text-lg">$49.99</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="bg-gradient-to-r from-maroon-800 to-rose-800 py-6 sm:py-8 lg:py-12">
        <div className="mx-auto max-w-screen-2xl px-4 md:px-8">
          <div className="flex flex-col overflow-hidden rounded-lg bg-gray-900 shadow-lg sm:flex-row md:h-80">
            <div className="flex w-full flex-col p-4 sm:w-1/2 sm:p-8 lg:w-2/5">
              <h2 className="mb-4 text-xl font-bold text-white md:text-2xl lg:text-4xl">
                Summer Sale
                <br />
                <span className="text-rose-500">Up to 70% off</span>
              </h2>
              <p className="mb-8 max-w-md text-gray-300">
                Don't miss out on our biggest sale of the season. Refresh your wardrobe with the latest trends at unbeatable prices.
              </p>
              <div className="mt-auto">
                <a
                  href="/browseproduct"
                  className="inline-block rounded-lg bg-rose-600 px-8 py-3 text-center text-sm font-semibold text-white outline-none ring-rose-300 transition duration-100 hover:bg-rose-700 focus-visible:ring active:bg-rose-800 md:text-base"
                >
                  Shop the Sale
                </a>
              </div>
            </div>
            <div className="order-first h-48 w-full bg-gray-800 sm:order-none sm:h-auto sm:w-1/2 lg:w-3/5">
              <img
                src="https://images.unsplash.com/photo-1505846951821-e25bacf2eccd?auto=format&q=75&fit=crop&crop=top&w=1000&h=500"
                loading="lazy"
                alt="Summer Sale"
                className="h-full w-full object-cover object-center"
              />
            </div>
          </div>
        </div>
      </div>

      {/* collections - start */}
      <div className="bg-black py-6 bg-gradient-to-r from-maroon-900 via-rose-900 to-rose-700 sm:py-8 lg:py-12">
        <div className="mx-auto max-w-screen-2xl px-4 md:px-8">
          <h2 className="mb-8 text-center text-2xl font-bold text-white md:mb-12 lg:text-3xl">
            Collections
          </h2>
          <div className="grid gap-4 sm:grid-cols-2 md:gap-6 lg:grid-cols-3 xl:grid-cols-4">
            {/* product - start */}
            <div>
              <a
                href="#"
                className="group relative flex h-96 items-end overflow-hidden rounded-lg bg-gray-900 p-4 shadow-lg"
              >
                <img
                  src="https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?auto=format&q=75&fit=crop&crop=top&w=600&h=700"
                  loading="lazy"
                  alt="Photo by Austin Wade"
                  className="absolute inset-0 h-full w-full object-cover object-center transition duration-200 group-hover:scale-110"
                />
                <div className="relative flex w-full flex-col rounded-lg bg-gray-800 p-4 text-center">
                  <span className="text-gray-400">Men</span>
                  <span className="text-lg font-bold text-white lg:text-xl">
                    Business Casual
                  </span>
                </div>
              </a>
            </div>
            {/* product - end */}
            {/* product - start */}
            <div>
              <a
                href="#"
                className="group relative flex h-96 items-end overflow-hidden rounded-lg bg-gray-900 p-4 shadow-lg"
              >
                <img
                  src="https://images.unsplash.com/photo-1603344797033-f0f4f587ab60?auto=format&q=75&fit=crop&crop=top&w=600&h=700"
                  loading="lazy"
                  alt="Photo by engin akyurt"
                  className="absolute inset-0 h-full w-full object-cover object-center transition duration-200 group-hover:scale-110"
                />
                <div className="relative flex w-full flex-col rounded-lg bg-gray-800 p-4 text-center">
                  <span className="text-gray-400">Women</span>
                  <span className="text-lg font-bold text-white lg:text-xl">
                    Summer Season
                  </span>
                </div>
              </a>
            </div>
            {/* product - end */}
            {/* product - start */}
            <div>
              <a
                href="#"
                className="group relative flex h-96 items-end overflow-hidden rounded-lg bg-gray-900 p-4 shadow-lg"
              >
                <img
                  src="https://images.unsplash.com/photo-1552668693-d0738e00eca8?auto=format&q=75&fit=crop&crop=top&w=600&h=700"
                  loading="lazy"
                  alt="Photo by Austin Wade"
                  className="absolute inset-0 h-full w-full object-cover object-center transition duration-200 group-hover:scale-110"
                />
                <div className="relative flex w-full flex-col rounded-lg bg-gray-800 p-4 text-center">
                  <span className="text-gray-400">Men</span>
                  <span className="text-lg font-bold text-white lg:text-xl">
                    Streetwear
                  </span>
                </div>
              </a>
            </div>
            {/* product - end */}
            {/* product - start */}
            <div>
              <a
                href="#"
                className="group relative flex h-96 items-end overflow-hidden rounded-lg bg-gray-900 p-4 shadow-lg"
              >
                <img
                  src="https://images.unsplash.com/photo-1560269999-cef6ebd23ad3?auto=format&q=75&fit=crop&w=600&h=700"
                  loading="lazy"
                  alt="Photo by Austin Wade"
                  className="absolute inset-0 h-full w-full object-cover object-center transition duration-200 group-hover:scale-110"
                />
                <div className="relative flex w-full flex-col rounded-lg bg-gray-800 p-4 text-center">
                  <span className="text-gray-400">Women</span>
                  <span className="text-lg font-bold text-white lg:text-xl">
                    Sale
                  </span>
                </div>
              </a>
            </div>
            {/* product - end */}
          </div>
        </div>
      </div>
      {/* collections - end */}
      {/* newsletter - start */}
      <div className="bg-black py-6 bg-gradient-to-r from-maroon-900 via-rose-900 to-rose-700 sm:py-8 lg:py-12">
        <div className="mx-auto max-w-screen-2xl px-4 md:px-8">
          <div className="flex flex-col items-center rounded-lg bg-gray-900 p-4 sm:p-8 lg:flex-row lg:justify-between">
            <div className="mb-4 sm:mb-8 lg:mb-0">
              <h2 className="text-center text-xl font-bold text-rose-500 sm:text-2xl lg:text-left lg:text-3xl">
                Get the latest updates
              </h2>
              <p className="text-center text-gray-400 lg:text-left">
                Sign up for our newsletter
              </p>
            </div>
            <div className="flex flex-col items-center lg:items-end">
              <form className="mb-3 flex w-full max-w-md gap-2">
                <input
                  placeholder="Email"
                  className="w-full flex-1 rounded border border-gray-700 bg-gray-800 px-3 py-2 text-white placeholder-gray-500 outline-none ring-rose-500 transition duration-100 focus:ring"
                />
                <button className="inline-block rounded bg-rose-600 px-8 py-2 text-center text-sm font-semibold text-white outline-none ring-rose-300 transition duration-100 hover:bg-rose-700 focus-visible:ring active:bg-rose-800 md:text-base">
                  Send
                </button>
              </form>
              <p className="text-center text-xs text-gray-500 lg:text-right">
                By signing up to our newsletter you agree to our{" "}
                <a
                  href="#"
                  className="underline transition duration-100 hover:text-rose-500 active:text-rose-600"
                >
                  Term of Service
                </a>{" "}
                and{" "}
                <a
                  href="#"
                  className="underline transition duration-100 hover:text-rose-500 active:text-rose-600"
                >
                  Privacy Policy
                </a>
                .
              </p>
            </div>
          </div>
        </div>
      </div>
      {/* newsletter - end */}
      {/* footer - start */}

      {/* footer - end */}
    </div>
  )
}

export default Home;