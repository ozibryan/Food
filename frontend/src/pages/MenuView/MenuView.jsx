import "./Menu.css";
import { BsPencil } from "react-icons/bs";
import { IoPrintOutline } from "react-icons/io5";
import { HiDotsHorizontal } from "react-icons/hi";
import { GiApothecary } from "react-icons/gi";
import { CiBookmark } from "react-icons/ci";
import { IoIosAdd } from "react-icons/io";
import { IoShareSocialOutline } from "react-icons/io5";
import { CiCircleInfo } from "react-icons/ci";
import { IoIosAddCircleOutline } from "react-icons/io";
import { CiCircleMinus } from "react-icons/ci";
import { IoIosArrowRoundUp } from "react-icons/io";
import { MdArrowOutward } from "react-icons/md";
import { useContext, useEffect, useState } from "react";
import { StoreContext } from "../../context/StoreContext";
import oliveOil from "../../assets/Icon/olive-oil-small.jpg";
import chickenBreast from "../../assets/Icon/chicken-breast.jpg";
import egg from "../../assets/Icon/eggs.jpg";
import breadCrumbs from "../../assets/Icon/brown-bread.jpg";
import parsemanCheese from "../../assets/Icon/cheese-slice.jpg";
import driedOregano from "../../assets/Icon/oregani.jpg";
import garlicPowder from "../../assets/Icon/garlic.jpg";
import kosherSalt from "../../assets/Icon/salt.jpg";
import blackPepper from "../../assets/Icon/black-beans.jpg";
import marninerSauce from "../../assets/Icon/sausage-mince.jpg";
import ShrededMozeralla from "../../assets/Icon/mango-frozen.jpg";
import parsley from "../../assets/Icon/parsley.jpg";
import { useParams } from "react-router-dom";
import axios from "axios";
import Loading from "../../components/Loading/Loading";
import Ingridents from "../../components/Ingredients/Ingridents";

const MenuView = () => {
    const { id } = useParams();

    const { url } = useContext(StoreContext);

    const [loading, setLoading] = useState(true);
    const [data, setData] = useState({});

    useEffect(() => {
        axios
            .get(`http://localhost:4000/api/food/list/${id}`)
            .then((res) => {
                setLoading(false);
                setData(res.data.data);
            })
            .catch((err) => {
                setLoading(false);
                alert("Failed to load data. Please try again later.");
                console.log(err);
            });
    }, []);

    return loading ? (
        <Loading />
    ) : (
        <div className="sub-main">
            <div className="menu-container">
                <div style={{ display: "flex", flexWrap: "wrap" }}>
                    <img
                        className="menu-image"
                        src={url + "/images/" + data.image}
                        alt="food-image"
                    />
                    <div className="menu-main">
                        <div className="menu-head">
                            <div className="menu-items">
                                <div>
                                    <BsPencil className="h-6 w-6" />
                                </div>
                                <div>
                                    <IoPrintOutline className="h-6 w-6" />
                                </div>
                                <div>
                                    <HiDotsHorizontal className="h-6 w-6" />
                                </div>
                            </div>
                            <div className="menu-buttons-main">
                                <button className="save-button">Save</button>
                                <button className="plan-button">Plan</button>
                            </div>
                        </div>

                        <div className="menu-company-main">
                            <div>
                                <GiApothecary style={{ height: 20, width: 20 }} />
                            </div>
                            <p style={{ fontSize: 12 }}>By someone</p>
                        </div>

                        <div>
                            <h1 className="menu-head">{data?.name}</h1>
                        </div>

                        <div className="menu-bookmark-main">
                            <div className="menu-bookmark">
                                <CiBookmark
                                    style={{
                                        height: 16,
                                        width: 16,
                                        padding: 0,
                                        margin: 0,
                                        color: "#FA9947",
                                    }}
                                />
                                <p style={{ padding: 0, margin: 0 }}>30.9k</p>
                            </div>
                            <div className="menu-bookmark">
                                <IoIosAdd
                                    style={{
                                        height: 16,
                                        width: 16,
                                        padding: 0,
                                        margin: 0,
                                        color: "#FA9947",
                                    }}
                                />
                                <p style={{ padding: 0, margin: 0 }}>Add to</p>
                            </div>
                            <div className="menu-bookmark">
                                <IoShareSocialOutline
                                    style={{
                                        height: 16,
                                        width: 16,
                                        padding: 0,
                                        margin: 0,
                                        color: "#FA9947",
                                    }}
                                />
                                <p style={{ padding: 0, margin: 0 }}>Share</p>
                            </div>
                        </div>

                        <hr style={{ marginTop: "20px" }} />

                        <div className="menu-instructions-main">
                            <p style={{ fontSize: 12 }}>Instructions</p>
                            <div className="instructions">
                                <p style={{ fontSize: 12, color: "gray" }}>Prep:</p>
                                <p style={{ fontSize: 14 }}>10 mins</p>
                                <p style={{ fontSize: 12, color: "gray" }}>Cook:</p>
                                <p style={{ fontSize: 14 }}>20 mins</p>
                            </div>
                        </div>
                        <hr />
                        <div>
                            <p className="menu-description">{data?.description}{data?.description}</p>
                        </div>
                    </div>
                </div>

                <div className="balance-main">
                    <h3 className="balance-head">Nutritions balance score</h3>
                    <div className="balance-button-main">
                        <button className="balance-button">Unbalanced</button>
                        <div>
                            <CiCircleInfo style={{ width: 20, height: 20, color: "gray" }} />
                        </div>
                    </div>

                    <hr style={{ marginTop: "10px" }} />

                    <div className="balance-index-main">
                        <div>
                            <p style={{ fontSize: "12px", display: "flex", gap: "5px" }}>
                                Glycemic Index{" "}
                                <span
                                    style={{
                                        background: "#F8DB50",
                                        color: "white",
                                        borderRadius: "5px",
                                        paddingLeft: "5px",
                                        paddingRight: "5px",
                                    }}
                                >
                                    98
                                </span>
                                <p style={{ fontWeight: "bold" }}>Moderate</p>
                            </p>
                            <p style={{ fontSize: "12px", display: "flex", gap: "5px", marginTop: 10 }}>
                                Glycemic Load{" "}
                                <span
                                    style={{
                                        background: "#5BCC79",
                                        color: "white",
                                        borderRadius: "5px",
                                        paddingLeft: "5px",
                                        paddingRight: "5px",
                                    }}
                                >
                                    98
                                </span>
                                <p style={{ fontWeight: "bold" }}>Low</p>
                            </p>
                        </div>

                        <div>
                            <CiCircleInfo />
                        </div>
                    </div>

                    <h4 style={{ marginTop: "10px", fontSize: 16 }}>Nutritions per serving</h4>

                    <div className="balance-head">
                        <div className="calories-balance-main">
                            <p style={{ fontSize: 12, fontWeight: "bold" }}>Calories</p>
                            <p style={{ fontSize: 12, color: "gray" }}>474.1 Kcal(24%)</p>
                        </div>
                        <div className="calories-balance-main">
                            <p style={{ fontSize: 12, fontWeight: "bold" }}>Total fat</p>
                            <p style={{ fontSize: 12, color: "gray" }}>474.1 g(24%)</p>
                        </div>
                        <div className="calories-balance-main">
                            <p style={{ fontSize: 12, fontWeight: "bold" }}>Carbs</p>
                            <p style={{ fontSize: 12, color: "gray" }}>474.1 g(24%)</p>
                        </div>
                        <div className="calories-balance-main">
                            <p style={{ fontSize: 12, fontWeight: "bold" }}>Sugar</p>
                            <p style={{ fontSize: 12, color: "gray" }}>474.1 g(24%)</p>
                        </div>
                        <div className="calories-balance-main">
                            <p style={{ fontSize: 12, fontWeight: "bold" }}>Protein</p>
                            <p style={{ fontSize: 12, color: "gray" }}>474.1 g(24%)</p>
                        </div>
                    </div>

                    <p style={{ fontSize: 10, marginTop: 10, color: "gray" }}>% Daily values on a 2,0000 calorie diet</p>

                    <p className="view-balance">View all nutritions</p>
                </div>
            </div>
            <div className="ads">
                <h1>Ads</h1>
            </div>

            <div style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
                <div className="ingredients-main">
                    <div className="ing-cont">
                        <h1 className="ing-head">ingredients</h1>
                        <button className="button-to-list">Add to list</button>
                    </div>
                    <div className="ing-units">
                        <div className="serv-ing">
                            <CiCircleMinus />
                            <div>4 servings</div>
                            <IoIosAddCircleOutline />
                        </div>
                        <div>
                            <button className="convert-unit-btn">Convert units</button>
                        </div>
                    </div>

                    <div>
                        <Ingridents
                            imgOne={oliveOil}
                            imageTwo={chickenBreast}
                            textOne={"2 table spoon olive oil"}
                            textTwo={"1 pound chicken breast"}
                        />

                        <Ingridents
                            imgOne={egg}
                            imageTwo={breadCrumbs}
                            textOne={"1 egg"}
                            textTwo={"1 cup panko bread crumbs"}
                        />

                        <Ingridents
                            imgOne={parsemanCheese}
                            imageTwo={driedOregano}
                            textOne={"1/2 cup parmesan cheese"}
                            textTwo={"1 teaspoon dried oregano"}
                        />

                        <Ingridents
                            imgOne={garlicPowder}
                            imageTwo={kosherSalt}
                            textOne={"1/2 tablespoon garlic powder"}
                            textTwo={"1 teaspoon kosher powder"}
                        />

                        <Ingridents
                            imgOne={blackPepper}
                            imageTwo={marninerSauce}
                            textOne={"1/2 tablespoon black pepper"}
                            textTwo={"1 cup marinara sauce"}
                        />

                        <Ingridents
                            imgOne={ShrededMozeralla}
                            imageTwo={parsley}
                            textOne={"1/2 cups shreded mozzarella"}
                            textTwo={"2 tablespoon parsley"}
                        />
                    </div>
                </div>

                <div className="instructions-main">
                    <div className="instructions-head-main">
                        <h1 className="instruction-head">Instructions</h1>
                        <div className="print-button">
                            <IoPrintOutline className="print-icon" />
                        </div>
                    </div>

                    <div className="external-site">
                        <p className="external-link-icon">View on foxandboiar.com</p>
                        <MdArrowOutward className="arrow-out" />
                    </div>

                    <div className="external-site-two-main">
                        <IoIosArrowRoundUp className="external-site-div " />
                        <p style={{ fontSize: "12px", color: "gray" }}>
                            Support creaters by visiting their site
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MenuView;