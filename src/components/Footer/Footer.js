import { Link } from "react-router-dom";
import styles from "./Footer.module.css"

export const Footer = () => {
    return (

        <footer className={styles["footer-distributed"]}>

            <div className={styles["footer-left"]}>

                <h3>Black Sea Resto</h3>

                <p className={styles["footer-links"]}>
                    <Link to="#" className={styles["link-1"]}>Home</Link>

                    <Link to="#">About</Link>

                    <Link to="#">Contact</Link>
                </p>

                <p className={styles["footer-company-name"]}>Black Sea Resto © 2023</p>
            </div>

            <div className={styles["footer-center"]}>

                <div>
                    <i className="fa fa-map-marker"></i>
                    <p><span>Republikanska str.10</span> Sozopol, Bulgaria</p>
                </div>

                <div>
                    <i className="fa fa-phone"></i>
                    <p>+359888888888</p>
                </div>

                <div>
                    <i className="fa fa-envelope"></i>
                    <p><Link to="">support@blacksearesto.com</Link></p>
                </div>

            </div>

            <div className={styles["footer-right"]}>

                <p className={styles["footer-company-about"]}>
                    <span>About the company</span>
                    Lorem ipsum dolor sit amet, consectateur adispicing elit. Fusce euismod convallis velit, eu auctor lacus vehicula sit amet.
                </p>

                <div className={styles["footer-icons"]}>

                    <Link to="#"><i className="fa-brands fa-facebook"></i></Link>
                    <Link to="#"><i className="fa-brands fa-instagram"></i></Link>
                    <Link to="#"><i className="fa-brands fa-tiktok"></i></Link>
                    <Link to="#"><i className="fa-brands fa-youtube"></i></Link>

                </div>

            </div>

        </footer>
    );
}