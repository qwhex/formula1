import { useCallback, useEffect, useState } from "react";
import styled from "styled-components";

const BACKEND_BASE_URL = "http://localhost:8000";

// ideally there would be a shared type repo for these
interface DriverResponse {
  id: number; // 0
  code: string; // 'ALB'
  firstname: string; // 'Alexander'
  lastname: string; // 'Albon'
  country: string; // 'TH'
  team: string; // 'Williams'

  // extra (non-db) params:
  imgUrl: string;
  place: number;
}

export const DriverList = () => {
  // List of Formula1 drivers

  const [drivers, setDrivers] = useState<DriverResponse[]>([]);

  useEffect(() => {
    const url = `${BACKEND_BASE_URL}/api/drivers`;

    const fetchDrivers = async () => {
      try {
        const response = await fetch(url);
        const json = await response.json();
        console.log("get drivers", json);
        setDrivers(json);
      } catch (error) {
        console.error(error);
      }
    };

    fetchDrivers();
  }, []);

  const overtake = useCallback(async (driverId: number) => {
    const url = `${BACKEND_BASE_URL}/api/drivers/${driverId}/overtake`;

    try {
      const response = await fetch(url, { method: "POST" });
      const json = await response.json();
      console.log(`overtake(${driverId})`, json);

      if (json?.error) {
        return console.error(json.error);
      }

      setDrivers(json);
    } catch (error) {
      console.error(error);
    }
  }, []);

  return (
    <CardList>
      {drivers.map((driver) => {
        return (
          <DriverCard key={driver.code} driver={driver} overtake={overtake} />
        );
      })}
    </CardList>
  );
};

const CardList = styled.div`
  width: 100%;
  height: 100%;
  margin-bottom: 300px;
`;

const DriverCard = ({
  // Card showing a single Formula1 driver
  driver: { id, code, firstname, lastname, country, team, imgUrl, place },
  overtake,
}: {
  driver: DriverResponse;
  overtake: (driverId: number) => void;
}) => {
  const cardTitle = `${firstname} ${lastname} (${country})`;
  const fullImageUrl = `${BACKEND_BASE_URL}${imgUrl}`;

  return (
    <CardContainer>
      <CardTitle>
        <Flag countryCode={country} /> {cardTitle}
      </CardTitle>
      <CardContent>
        <img src={fullImageUrl} alt={cardTitle} width={100} />
        <div>
          <p>Place: #{place}</p>
          <p>Team: {team}</p>
          <p>Code: {code}</p>
        </div>
      </CardContent>
      <Button onClick={() => overtake(id)} disabled={place === 1}>
        Overtake ↑
      </Button>
    </CardContainer>
  );
};

const CardContainer = styled.div`
  margin: 0 0 32px;
  padding: 32px;
  border: 1px solid #ddd;
  border-radius: 4px;
  background-color: white;
  box-shadow: 0 30px 30px -25px rgba(65, 65, 65, 0.25);
`;

const CardContent = styled.div`
  display: flex;
  align-items: start;
  gap: 8px;
  margin-bottom: 8px;

  p {
    margin: 6px 0;
  }
`;

const CardTitle = styled.h2`
  display: flex;
  align-items: center;
  gap: 4px;
  margin: 0 0 4px;
`;

const Flag = ({
  countryCode,
  size = 32,
}: {
  countryCode: string;
  size?: number;
}) => (
  <img
    src={`https://flagsapi.com/${countryCode}/flat/${size}.png`}
    alt={`Flag of ${countryCode}`}
    width={size}
    height={size}
  />
);

const Button = styled.button`
  width: 100px;
  height: 25px;
`;
