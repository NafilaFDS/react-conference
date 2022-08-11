import React from 'react'
import Image from 'next/image'
import Link from "next/link"

const Navbar = () => {
    return (
        <div>
            <div className="navbar">
                <Link href="/" >
                    <div className="logo">
                        <Image src="/images/logo.png" alt="React Logo" layout='fill' className="logo-img" />
                    </div>

                </Link>
                <div className='nav-link'>
                    <Link href="#">About us</Link>
                    <Link href="#">What We do</Link>
                    <Link href="#">Our work</Link>
                    <Link href="#">Blog</Link>
                    <Link href="#">Say hi</Link>
                </div>
                <Image className="burger" src="/images/burger.png" alt="Ham burger" width={18} height={18} />
            </div>
        </div>
    )
}

export default Navbar