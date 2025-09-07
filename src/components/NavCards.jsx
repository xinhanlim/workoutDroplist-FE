import { Link } from 'wouter';


export default function NavCards({ title, href, image, titleColor}) {
    return (<>
        <Link href={href}>
            <div className=" relative min-w-[375px] h-[500px] overflow-hidden border-2 border-[#282828] ">
                <img src={image} alt={title} className="absolute inset-0 w-full h-full opacity-95 object-cover transition-transform duration-500 hover:scale-105 "
                />
                <div className="relative z-10">
                    <h1 className="px-4 py-4 font-bold text-4xl ${titleColor}" style={{ color: titleColor }}>{title}</h1>
                </div>
            </div>
        </Link>
    </>)


}