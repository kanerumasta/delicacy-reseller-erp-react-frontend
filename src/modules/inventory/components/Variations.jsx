import React, { useEffect, useState } from "react";
import { api } from "../../../shared/api";
import styled from "styled-components";
import AddVariation from "./AddVariation";
import { useParams } from "react-router-dom";

const Container = styled.div`
  padding: 10px;
  border-radius: 8px;
  background: linear-gradient(to right, #dee0ee, #eaeaf4);
  box-shadow: 5px 5px 10px #c0c0c0, -5px -5px 10px #ffffff;
`;

const Variations = () => {
  const { delicacyId } = useParams();
  const [refresh, setRefresh] = useState(0);
  const [variations, setVariations] = useState([]);
  useEffect(() => {
    async function fetchVariations() {
      try {
        const response = await api.get(
          `inventory/delicacies/${delicacyId}/variations`
        );
        if (response.status === 200) {
          setVariations(response.data);
        }
      } catch (error) {
        console.log(error);
      }
    }
    fetchVariations();
  }, [refresh, delicacyId]);

  return (
    <Container>
      <AddVariation refreshVaritions={() => setRefresh(refresh + 1)} />
      {variations.map((variation) => {
        return (
          <p key={variation.id}>
            {variation.name}--{variation.price}
          </p>
        );
      })}
    </Container>
  );
};

export default Variations;
