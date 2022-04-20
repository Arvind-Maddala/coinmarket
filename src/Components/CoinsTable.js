import {
  Container,
  Pagination,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { CoinState } from "../CoinContext";
import { CoinList } from "../Config/Api";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import LinearProgress from "@mui/material/LinearProgress";
import { useNavigate } from "react-router-dom";
import { numberWithCommas } from "./Banner/Carousel";

const CoinsTable = () => {
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const { currency, currencySymbol } = CoinState();

  const fetchCoins = async () => {
    setLoading(true);
    const { data } = await axios.get(CoinList(currency));
    setCoins(data);
    setLoading(false);
  };
  useEffect(() => {
    fetchCoins();
  }, [currency]);

  const handleSearch = () => {
    return coins.filter(
      (coin) =>
        coin.name.toLowerCase().includes(search) ||
        coin.symbol.toLowerCase().includes(search)
    );
  };

  let navigate = useNavigate();
  return (
    <Container sx={{ textAlign: "center" }}>
      <Typography mt={3} variant="h4">
        Cryptocurrency Prices by Market Cap
      </Typography>
      <TextField
        id="outlined-basic"
        label="Search for a crypto currency"
        variant="outlined"
        sx={{ width: "100%", margin: "2rem 0" }}
        onChange={(e) => setSearch(e.target.value)}
      />
      <TableContainer component={Paper}>
        {loading ? (
          <Box sx={{ width: "100%" }}>
            <LinearProgress />
          </Box>
        ) : (
          <Table aria-label="simple table" sx={{ minWidth: 650 }}>
            <TableHead>
              <TableRow hover>
                {["#   Coin", "Price", "24h Change", "Market Cap"].map(
                  (head) => (
                    <TableCell
                      align={head === "#  Coin" ? "left" : "center"}
                      style={{
                        fontWeight: "700",
                        fontSize: "1.2rem",
                      }}
                    >
                      {head}
                    </TableCell>
                  )
                )}
              </TableRow>
            </TableHead>
            <TableBody>
              {handleSearch()
                .slice((page - 1) * 10, (page - 1) * 10 + 10)
                .map((row) => {
                  const profit = row.price_change_percentage_24h > 0;
                  return (
                    <TableRow
                      onClick={() => {
                        navigate(`/coins/${row.id}`);
                      }}
                      key={row.name}
                      sx={{
                        "&:last-child td, &:last-child th": { border: 0 },
                        "&:hover": { backgroundColor: "#e6f0ff" },
                      }}
                    >
                      <TableCell
                        component="th"
                        scope="row"
                        sx={{ display: "flex", alignItems: "center" }}
                      >
                        <img
                          src={row?.image}
                          alt={row.name}
                          height="40"
                          style={{
                            margin: "1rem",
                          }}
                        />
                        <div
                          style={{ display: "flex", flexDirection: "column" }}
                        >
                          <span
                            style={{
                              textTransform: "uppercase",
                              fontSize: "1.2rem",
                              fontWeight: "500",
                            }}
                          >
                            {row.symbol}
                          </span>
                          <span>{row.name}</span>
                        </div>
                      </TableCell>
                      <TableCell
                        align="center"
                        style={{
                          fontSize: "1rem",
                        }}
                      >
                        {currencySymbol}
                        {numberWithCommas(row.current_price.toFixed(2))}
                      </TableCell>
                      <TableCell
                        align="center"
                        style={{
                          color: profit > 0 ? "#16c784" : "#ea3943",
                          fontSize: "1rem",
                        }}
                      >
                        {profit && "+"}
                        {row.price_change_percentage_24h?.toFixed(2)}%
                      </TableCell>
                      <TableCell
                        align="center"
                        style={{
                          fontSize: "1rem",
                        }}
                      >
                        {" "}
                        {currencySymbol}
                        {numberWithCommas(
                          row.market_cap.toString().slice(0, -6)
                        )}{" "}
                        M
                      </TableCell>
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        )}
      </TableContainer>
      <Pagination
        count={(handleSearch()?.length / 10).toFixed(0)}
        color="primary"
        sx={{ p: 2, width: "100%", display: "flex", justifyContent: "center" }}
        onChange={(event, value) => {
          setPage(value);
          window.scroll(0, 450);
        }}
      />
    </Container>
  );
};

export default CoinsTable;
