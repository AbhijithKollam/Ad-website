import React, { useEffect, useState } from 'react'
import './bread_style.css'

const Breadcrum = ({ page }) => {
    const [pageName, setPagename] = useState("")
    useEffect(() => {
        switch (page) {
            case "profile":
                setPagename("Profile")
                break;
            case "post":
                setPagename("Post Ad")
                break;
            case "list":
                setPagename("Ads")
                break;
            case "account":
                setPagename("My Profile")
                break;
            default:

                break;
        }
    })

    return (
        <div className='mx-9 px-6 mt-6 breadcrum'>
            Home <span className='mx-2'> &gt; </span> {pageName}
        </div>
    )
}

export default Breadcrum
