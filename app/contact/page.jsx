import Image from "next/image";
import phoneSquareIcon from "@/public/icons/phone-square-icon.svg";
import whatsappSquareIcon from "@/public/icons/whatsapp-square-icon.svg";
import mapPinBlackIcon from "@/public/icons/map-pin-black-icon.svg";

const Contact = () => {
  return (
    <div className="container h-75 d-flex flex-column align-items-center justify-content-center mt-5">
      <h1>Contáctanos</h1>
      <div className="h-100 row w-100 mt-5">
        <div className="col-12 col-lg-4 my-3">
          <div className="d-flex flex-column align-items-center justify-content-center bg-secondary-subtle rounded p-3 h-100 w-auto">
            <Image width={100} height={100} src={phoneSquareIcon} alt="" />
            <div className="fs-4 text-center mt-3">
              <p>Teléfono:</p>
              <p>677 77 77 77</p>
            </div>
          </div>
        </div>
        <div className="col-12 col-lg-4 my-3">
          <div className="d-flex flex-column align-items-center justify-content-center bg-secondary-subtle rounded p-3 h-100 w-auto">
            <Image width={100} height={100} src={whatsappSquareIcon} alt="" />
            <div className="fs-4 text-center mt-3">
              <p>WhatsApp:</p>
              <p>677 77 77 77</p>
            </div>
          </div>
        </div>
        <div className="col-12 col-lg-4 my-3">
          <div className="d-flex flex-column align-items-center justify-content-center bg-secondary-subtle rounded p-3 h-100 w-auto">
            <Image width={100} height={100} src={mapPinBlackIcon} alt="" />
            <div className="fs-4 text-center mt-3">
              <p>Dirección:</p>
              <p>Avenida Ejemplo, 1, Valladolid</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
