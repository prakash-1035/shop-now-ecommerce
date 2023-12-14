import React from "react";
import {
    AiOutlineInstagram,
    AiFillLinkedin,
    AiFillGithub,
    AiFillPicture,
} from "react-icons/ai";
const Footer = () => {
    return (
        <footer style={{ backgroundColor: "rgba(0,0,0,0.1)" }}>
            <div className="container pt-3">
                <div className="row">
                    <div className="col-lg-6 col-md-12 mb-4">
                        <h5 className="mb-3 text-dark">About Website </h5>
                        <p>
                            This is A fully functional ecommerece website
                            developed by Mr. Bharat Bardiya. fill free to clone
                            and use for any non-commercial use from our github.
                        </p>
                    </div>
                    <div className="col-lg-3 col-md-6 mb-4">
                        <h5 className="mb-3 text-dark">links</h5>
                        <ul className="list-unstyled mb-0">
                            <li className="mb-1">
                                <a
                                    target={"blank"}
                                    href="https://github.com/Bharatbardiya"
                                    style={{ color: "#4f4f4f" }}
                                >
                                    <AiFillGithub />
                                    <span className="ms-2">GitHub</span>
                                </a>
                            </li>
                            <li className="mb-1">
                                <a
                                    target={"blank"}
                                    href="https://instagram.com/bharat_bardiya"
                                    style={{ color: "#4f4f4f" }}
                                >
                                    <AiOutlineInstagram />
                                    <span className="ms-2">Instagram</span>
                                </a>
                            </li>
                            <li className="mb-1">
                                <a
                                    target={"blank"}
                                    href="https://linkedin.com/in/bharatbardiya"
                                    style={{ color: "#4f4f4f" }}
                                >
                                    <AiFillLinkedin />
                                    <span className="ms-2">Linkedin</span>
                                </a>
                            </li>
                            <li>
                                <a
                                    target={"blank"}
                                    href="https://leetcode.com/bharat_bardiya"
                                    style={{ color: "#4f4f4f" }}
                                >
                                    <AiFillPicture />
                                    <span className="ms-2">Leetcode</span>
                                </a>
                            </li>
                        </ul>
                    </div>
                    <div className="col-lg-3 col-md-6 mb-4">
                        <h5 className="mb-1 text-dark">Contact Me</h5>
                        <p>
                            If You have any oportunity for Role : SDE, SDE
                            intern. and also if need a freelancer in website
                            development.
                        </p>
                        <div>
                            <i className="bi bi-envelope"></i>
                            <span className="ms-2 fw-bold">
                                bharatbardiya123@gmail.com
                            </span>
                        </div>
                    </div>
                </div>
            </div>
            <div
                className="text-center p-3"
                style={{ backgroundColor: "rgba(0, 0, 0, 0.2)" }}
            >
                © {new Date().getFullYear()} Copyright:
                <a
                    className="text-dark"
                    href="https://github.com/Bharatbardiya"
                >
                    Bharat Bardiya
                </a>
            </div>
        </footer>
    );
};

export default Footer;
