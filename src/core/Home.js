import React, { useEffect } from "react";
import Layout from "./Layout";

import syd_1 from "../images/home/syd_1.jpg";
import syd_3 from "../images/home/syd_3.jpg";
import syd_2 from "../images/home/syd_2.jpg";
import syd_5 from "../images/home/syd_5.jpg";
import flag from "../images/home/flag.png";
import liberty_1 from "../images/home/liberty_1.png";
import syd_header_widest from "../images/home/syd_header_widest.jpg";

const Home = () => {
  useEffect(() => {}, []);

  return (
    <Layout title="Home Page" description="Syd University Home" fluid>
      <div style={{ paddingTop: "80px" }}>
        <div class="carousel-inner text-center">
          <div class="carousel-item active">
            <img
              src={syd_header_widest}
              class="d-block w-100"
              alt="Syd University Background"
              fluid
            />
            <div class="carousel-caption d-flex h-100 align-items-center justify-content-center">
              <h1 className="mainHeaderFont" fluid>
                SYD UNIVERSITY
              </h1>
            </div>
          </div>
        </div>
      </div>

      <div
        class="row"
        style={{
          textAlign: "center",
          paddingTop: "100px",
        }}
      >
        <div class="col-sm">
          <h3 className="subHeaderFont">Blog</h3>
          <br />
          <iframe
            src="https://giphy.com/embed/l4FGr7tMjH3ajuwy4"
            title="computer"
            width="100"
            frameBorder="0"
            class="giphy-embed"
            allowFullScreen
            className="homeGif"
          ></iframe>
        </div>
        <div class="col-sm">
          <h3 className="subHeaderFont">Shop</h3>
          <br />
          <iframe
            src="https://giphy.com/embed/l4pTgIqbwsxZTITuM"
            title="dollar"
            width="150"
            frameBorder="0"
            class="giphy-embed"
            allowFullScreen
            className="homeGif"
          ></iframe>
        </div>
        <div class="col-sm">
          <h3 className="subHeaderFont">Yearbook</h3>
          <br />
          <iframe
            src="https://giphy.com/embed/l4FGo3znN36Arx0o8"
            title="sdCard"
            width="150"
            frameBorder="0"
            class="giphy-embed"
            allowFullScreen
            className="homeGif"
          ></iframe>
        </div>
      </div>

      <div
        class="jumbotron jumbotron-fluid mb-0 "
        style={{ textAlign: "center", backgroundColor: "#fff" }}
      >
        <div class="container">
          <h2 className="subHeaderFont">
            American Handmade{" "}
            <img
              src={flag}
              alt="American Flag"
              style={{ maxWidth: "30px" }}
              fluid
            />{" "}
            Sweatshop Free{" "}
            <img
              src={liberty_1}
              alt="Lady of Liberty"
              style={{ maxWidth: "25px" }}
              fluid
            />
          </h2>

          <br />
          <p class="lead" style={{ fontSize: "15px" }}>
            It is a long established fact that a reader will be distracted by
            the readable content of a page when looking at its layout. The point
            of using Lorem Ipsum is that it has a more-or-less normal
            distribution of letters, as opposed to using 'Content here, content
            here', making it look like readable English. Many desktop publishing
            packages and web page editors now use Lorem Ipsum as their default
            model text, and a search for 'lorem ipsum' will uncover many web
            sites still in their infancy. Various versions have evolved over the
            years, sometimes by accident, sometimes on purpose (injected humour
            and the like).
          </p>
        </div>
      </div>
      <div class="container">
        <div
          class="row"
          style={{
            textAlign: "center",
            paddingBottom: "50px",
            paddingTop: "50px",
          }}
        >
          <div class="col-lg">
            <img
              src={syd_3}
              alt="Female with Green Syd Jacket"
              style={{ maxWidth: "100%", paddingBottom: "80px" }}
              fluid
            />
          </div>
          <div class="col-lg">
            <img
              src={syd_5}
              alt="Female with Green Syd Jacket"
              style={{ maxWidth: "100%", paddingBottom: "80px" }}
              fluid
            />
          </div>
          <div class="col-lg">
            <img
              src={syd_2}
              alt="Male with Long Sleeve Shirt"
              style={{ maxWidth: "100%", paddingBottom: "80px" }}
              fluid
            />
          </div>
          <div class="col-lg">
            <img
              src={syd_1}
              alt="Male with Long Sleeve Shirt"
              style={{ maxWidth: "100%", paddingBottom: "80px" }}
              fluid
            />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Home;
