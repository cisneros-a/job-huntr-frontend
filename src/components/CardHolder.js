import React from "react";
import LeadCard from "./LeadCard";

export default function CardHolder(props) {
  console.log("props", props);
  return props.leads.map((lead) => (
    <div className="CardHolder">
      <LeadCard
        key={lead}
        handleCardClick={props.handleCardClick}
        lead={lead}
      />
    </div>
  ));
}
