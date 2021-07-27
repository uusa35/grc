export default function ImagesList({images, type, id}) {
    return (
        <ul role="list"
            className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 sm:gap-x-6 lg:grid-cols-4 xl:gap-x-8">
            {images.map((img) => (
                <li key={img.source} className="relative">
                    <div
                        className="group block w-full aspect-w-10 aspect-h-7 rounded-lg bg-gray-100 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-offset-gray-100 focus-within:ring-indigo-500 overflow-hidden">
                        <img src={img.imageThumb} alt=""
                             className="object-cover pointer-events-none group-hover:opacity-75"/>
                        <button type="button" className="absolute inset-0 focus:outline-none">
                            {/*<span className="sr-only">View details for {img.title}</span>*/}
                            <span
                                className={'rounded-lg inline-flex p-3 ring-1 ring-white text-white'}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none"
                                     viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12"/>
                                </svg>
                            </span>
                        </button>
                    </div>
                    {/*<p className="mt-2 block text-sm font-medium text-gray-900 truncate pointer-events-none">{img.title}</p>*/}
                    {/*<p className="block text-sm font-medium text-gray-500 pointer-events-none">{img.size}</p>*/}
                </li>
            ))}
        </ul>
    )
}
