import { useParams } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
import eth from "../../assets/images/ethereum.svg";
import "./CollectionBio.scss";
import Loading from "../Loading/Loading";

const CollectionBio = () => {
  const [bioStats, setBioStats] = useState(null);

  const { id } = useParams();

  const URL = `${process.env.REACT_APP_URL}/info/${id}`;

  useEffect(() => {
    axios.get(`${URL}`).then((response) => {
      setBioStats(response.data);
    });
  }, [URL]);

  if (!bioStats) {
    return <Loading />;
  }

  return (
    <div className="collection">
      <div className="collection-container">
        <div className="collection__profile">
          <img
            src={bioStats.images.image_url || eth}
            alt="Collection Profile"
            className="collection__img"
          />
        </div>
        <div className="collection__info">
          <div className="collection__name">
            <p>{bioStats ? bioStats.name : ""}</p>
          </div>
          <div className="collection__link">
            <div className="collection__site">
              <p>
                Floor Price: Ξ
                {bioStats.stats.floorPrice
                  ? bioStats.stats.floorPrice.price
                  : ""}
              </p>
            </div>
            <div className="collection__social">
              <p>
                Holder/Supply:
                {bioStats.stats.holders && bioStats.stats.totalSupply
                  ? Math.round(
                      (bioStats.stats.holders / bioStats.stats.totalSupply) *
                        100
                    ) / 100
                  : ""}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CollectionBio;
