import styles from "./Footer.module.css"

export const Footer = () => {
    return (

        <footer className={styles["footer-distributed"]}>

            <div className={styles["footer-left"]}>

                <h3>Black Sea Resto</h3>

                <p className={styles["footer-links"]}>
                    <a href="#" className={styles["link-1"]}>Home</a>

                    <a href="#">About</a>

                    <a href="#">Contact</a>
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
                    <p><a href="">support@blacksearesto.com</a></p>
                </div>

            </div>

            <div className={styles["footer-right"]}>

                <p className={styles["footer-company-about"]}>
                    <span>About the company</span>
                    Lorem ipsum dolor sit amet, consectateur adispicing elit. Fusce euismod convallis velit, eu auctor lacus vehicula sit amet.
                </p>

                <div className={styles["footer-icons"]}>

                    <a href="#"><i className="fa-brands fa-facebook"></i></a>
                    <a href="#"><i className="fa-brands fa-instagram"></i></a>
                    <a href="#"><i className="fa-brands fa-tiktok"></i></a>
                    <a href="#"><i className="fa-brands fa-youtube"></i></a>

                </div>

            </div>

        </footer>
    );
}