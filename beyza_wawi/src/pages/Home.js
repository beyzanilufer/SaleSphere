import React from "react";
import '../css/Home.css'
import { SlBasket } from "react-icons/sl";
import { PiLockKey } from "react-icons/pi";
import { TbReportSearch } from "react-icons/tb";
import { IoCubeOutline } from "react-icons/io5";
import { LiaCubesSolid } from "react-icons/lia";
import { BiGrid } from "react-icons/bi";
import { PiUsersThree } from "react-icons/pi";
import { Link } from "react-router-dom";
import { PiUsers } from "react-icons/pi";
import { SlBasketLoaded } from "react-icons/sl";

function Home() {

    return (
        <div className="home">




            <div className="flex-between">


                <div className="adiv">

                    <div className="adiv">
                        <div className="text">
                            <h2>Order</h2>
                        </div>
                        <div className="flex-between ">
                            <Link onClick={() => sessionStorage.setItem("pageTitle", "ORDER REQUEST")} to="/orderRequest" className="containerss">
                                <SlBasketLoaded className="icon" />
                                <p className="p">ORDER REQUEST</p>

                            </Link>

                            <Link onClick={() => sessionStorage.setItem("pageTitle", "ORDER LIST")} to="/orderList" className="containerss">
                                <SlBasket className="icon" />
                                <p className="p">ORDER LIST</p>

                            </Link>
                        </div>
                    </div>


                    <div className="adiv">
                        <div className="text">
                            <h2>Company</h2>
                        </div>
                        <Link onClick={() => sessionStorage.setItem("pageTitle", "CHANGE PASSWORD")} to="/company" className="containerCompany">

                            <PiLockKey className="icon" />
                            <p className="p">CHANGE PASSWORD</p>
                        </Link>
                    </div>






                    <div className="adiv">
                        <div className="text">
                            <h2>Reports</h2>
                        </div>
                        <div className="flex-between ">


                            <Link onClick={() => sessionStorage.setItem("pageTitle", "ARTICLE REPORT")} to="/articleReport" className="containerssReports">

                                <TbReportSearch className="icon" />
                                <p className="p">ARTICLE REPORT</p>
                            </Link>
                            <Link onClick={() => sessionStorage.setItem("pageTitle", "ORDER REPORT")} to="/orderReport" className="containerssReports">


                                <SlBasket className="icon" />
                                <p className="p">ORDER REPORT</p>
                            </Link>
                        </div>
                    </div>


                </div>


                <div className="adiv">

                    <div className="adiv">
                        <div className="text">
                            <h2  >Business Partner</h2>
                        </div>



                        <Link onClick={() => sessionStorage.setItem("pageTitle", "BUSINESS PARTNER")} to="/business" className="containerBusiness">
                            <PiUsers className="icon" />
                            <p className="p">BUSINESS PARTNER</p>
                        </Link>
                    </div>






                    <div className="adiv">
                        <div className="text">
                            <h2>Master Data Management</h2>
                        </div>


                        <div className="flex-between " >


                            <Link onClick={() => sessionStorage.setItem("pageTitle", "MAIN GROUPS")} to="/mainGroup" className="containersManagement">


                                <PiUsersThree className="icon" />
                                <p className="p">MAIN GROUPS</p>


                            </Link>

                            <Link onClick={() => sessionStorage.setItem("pageTitle", "GROUPS")} to="/groups" className="containersManagement">

                                <LiaCubesSolid className="icon" />
                                <p className="p">GROUPS</p>
                            </Link>
                            <Link onClick={() => sessionStorage.setItem("pageTitle", "DEPARTMENT")} to="/department" className="containersManagement">

                                <BiGrid className="icon" />
                                <p className="p">DEPARTMENT</p>
                            </Link>



                        </div>
                        <Link onClick={() => sessionStorage.setItem("pageTitle", "ARTICLES")} to="/articles" className="containerArticle">

                            <IoCubeOutline className="icon" />
                            <p className="p">ARTICLES</p>
                        </Link>



                    </div>
                </div> </div>











        </div>
    )
}
export default Home