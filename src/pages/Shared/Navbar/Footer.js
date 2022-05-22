import React from "react";
import footer from "../../../assets/images/footer.png"
const Footer = () => {
    const getYear =()=> {
        return new Date().getFullYear();
    }
  return (
    <footer
      style={{
        background: `url(${footer})`,
        backgroundSize: "cover",
      }}
      className=" p-10 justify-center items-center"
    >
        <div className="footer grid grid-cols-3 sm:grid-cols-3 ">
        <div>
        <span className="footer-title">Services</span>
        <a className="link link-hover">Branding</a>
        <a className="link link-hover">Design</a>
        <a className="link link-hover">Marketing</a>
        <a className="link link-hover">Advertisement</a>
      </div>
      <div>
        <span className="footer-title">Company</span>
        <a className="link link-hover">About us</a>
        <a className="link link-hover">Contact</a>
        <a className="link link-hover">Jobs</a>
        <a className="link link-hover">Press kit</a>
      </div>
      <div>
        <span className="footer-title">Legal</span>
        <a className="link link-hover">Terms of use</a>
        <a className="link link-hover">Privacy policy</a>
        <a className="link link-hover">Cookie policy</a>
      </div>
        </div>
      <div className="my-10 text-center">
        <p>Copyright © {getYear()} - All right reserved by Doctors Portal </p>
      </div>
    </footer>
  );
};

export default Footer;
