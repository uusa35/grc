import {InertiaLink} from "@inertiajs/inertia-react";

const Nav = () => {
    return (
        <>
            <InertiaLink className="px-10" href="/">Home</InertiaLink>
            <InertiaLink className="px-10" href="/hello">Hello</InertiaLink>
            <InertiaLink className="px-10" href="/contactus">Contactus</InertiaLink>
            <InertiaLink className="px-10" href="/page">Page Index</InertiaLink>
            <InertiaLink className="px-10" href="/page/2">Page Two</InertiaLink>
        </>
    );
}


export default Nav;
