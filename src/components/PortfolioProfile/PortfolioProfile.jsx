import "./PortfolioProfile.scss";
import logo from "../../assets/images/ethereum.svg";
import { useContext } from "react";
import { ExplainerContext } from "../../context/ExplainerContext";
import { Badge } from "@chakra-ui/react";

const PortfolioProfile = ({ ens, totalValue, scores, labels }) => {
  const [explainerHover, setExplainerHover] = useContext(ExplainerContext);

  const handleExplainer = (event) => {
    setExplainerHover({
      show: !explainerHover.show,
      info: event.target.textContent,
    });
    console.log("explainerHover", explainerHover);
  };

  return (
    <div className="profile">
      <div className="profile__container">
        <div className="profile__left">
          <div className="profile__img">
            <img src={logo} alt="Portfolio icon" />
          </div>
          <div className="profile__value">
            <p className="profile__address">{ens ? ens : ""}</p>
            <p className="profile__eth">Ξ{Math.round(totalValue * 100) / 100}</p>
          </div>
        </div>
        <div className="profile__stats">
          <p onMouseOver={handleExplainer} onMouseLeave={handleExplainer}>
            {scores
              ? scores.hands === "normie"
                ? "👋 Normie Hands"
                : scores.hands === "new"
                ? "🐣 New"
                : scores.hands === "paper"
                ? "📜 Paper Hands"
                : scores.hands === 1 || scores.hands === "1"
                ? "Holds Sometimes"
                : scores.hands === 2 || scores.hands === "2"
                ? "Holds Occasionally"
                : scores.hands === 3 || scores.hands === "3"
                ? "Long Term Holder"
                : scores.hands === 4 || scores.hands === "4"
                ? "Very Long Term Holder"
                : scores.hands === 5 || scores.hands === "5"
                ? "King Holder"
                : ""
              : ""}
          </p>
          <p onMouseOver={handleExplainer} onMouseLeave={handleExplainer}>
            {scores
              ? scores.whaleness === 1
                ? "🦐 Shrimp"
                : scores.whaleness === 2
                ? "🐟 fish"
                : scores.whaleness === 3
                ? "🐬 Dolphin"
                : scores.whaleness === 4
                ? "🦈 Shark"
                : scores.whaleness === 5
                ? "🐳 Whale"
                : ""
              : ""}
          </p>
          {labels.map((label, index) => {
            return (
              <Badge
                key={index}
                onMouseOver={handleExplainer}
                onMouseLeave={handleExplainer}
              >
                {label.name
                  ? label.name === "diamond"
                    ? "💎 Diamond Hands"
                    : label.name === "five-diamond"
                    ? "💎 Top 3% Holder"
                    : label.name === "paperhands"
                    ? "📜 Paper Hands"
                    : label.name === "whale"
                    ? "🐳 Whale"
                    : label.name === "blue-chip"
                    ? "💸 Blue Chip"
                    : label.name === "smart-money"
                    ? "💰🧠 Smart Money"
                    : label.name === "top-minter"
                    ? "⛏️ Top Minter"
                    : label.name === "top-trader"
                    ? "📈 Top Trader"
                    : ""
                  : ""}
              </Badge>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default PortfolioProfile;
