import Carousel from "react-bootstrap/Carousel";

const HomePage = () => {

  return (
    <div style={{ position: "relative", height: "100vh", overflow: "hidden" }}>
      <Carousel fade controls={false} indicators={false} interval={3000} style={{ height: "100vh" }}>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="/images/car1.jpg"
            alt="Luxury Cars"
            style={{ objectFit: "cover", height: "100vh" }}
          />
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="/images/car2.jpg"
            alt="Sports Cars"
            style={{ objectFit: "cover", height: "100vh" }}
          />
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="/images/car3.jpg"
            alt="Family Cars"
            style={{ objectFit: "cover", height: "100vh" }}
          />
        </Carousel.Item>
      </Carousel>

      <div
        className="position-absolute top-50 start-50 translate-middle text-center text-white"
        style={{ zIndex: 2 }}
      >
        <h1 className="display-3 fw-bold">Welcome to Vehicle Rental</h1>
        <p className="lead">Rent the best vehicles at the most affordable prices</p>
          </div>

      <div
        className="position-absolute top-0 start-0 w-100 h-100"
        style={{ backgroundColor: "rgba(0, 0, 0, 0.4)", zIndex: 1 }}
      ></div>
    </div>
  );
};

export default HomePage;
