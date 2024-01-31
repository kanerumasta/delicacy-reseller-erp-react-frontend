import React, { useEffect, useState } from "react";
import { api } from "../../../shared/api";

import Loading from "../../../shared/components/Loading";
import {
  Table,
  TableColumn,
  TableHeader,
  TableRow,
  TableBody,
  TableCell,
  Pagination,
  Chip,
  Button,
  Dropdown,
  DropdownItem,
  DropdownTrigger,
  DropdownMenu,
  Input,
  Spacer,
} from "@nextui-org/react";
import { capitalize, formatDate } from "../../inventory2/utils";
import { BiDotsVerticalRounded, BiSearch } from "react-icons/bi";

const Inventory = () => {
  const [inventoryItems, setInventoryItems] = useState([]);
  const [ready, setReady] = useState(false);
  const [filterValue, setFilterValue] = useState("");
  const [page, setPage] = React.useState(1);
  const rowsPerPage = 5;
  const hasSearchFilter = Boolean(filterValue);
  const pages = Math.ceil(inventoryItems.length / rowsPerPage);

  useEffect(() => {
    async function fetchInventory() {
      try {
        const response = await api.get("inventory/items");
        if (response && response.status === 200) {
          setInventoryItems(response.data);
          setReady(true);
        }
      } catch (error) {
        if (error.response) {
          console.log(error.response);
        }
      }
    }
    fetchInventory();
  }, []);

  const filteredItems = React.useMemo(() => {
    let filteredInventoryItems = [...inventoryItems];

    if (hasSearchFilter) {
      filteredInventoryItems = filteredInventoryItems.filter((item) =>
        item.variation.delicacy.name
          .toLowerCase()
          .includes(filterValue.toLowerCase())
      );
    }
    return filteredInventoryItems;
  }, [filterValue, inventoryItems]);

  const items = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return filteredItems.slice(start, end);
  }, [page, filteredItems, rowsPerPage]);

  function getItemStatus(item) {
    if (item.quantity <= 0) {
      return "out";
    } else if (item.quantity <= item.reorder_level) {
      return "low";
    } else {
      return "in";
    }
  }
  function calculateStockValue(item) {
    const value = item.variation.price * item.quantity;
    return value.toFixed(2);
  }

  const onClear = React.useCallback(() => {
    setFilterValue("");
    setPage(1);
  }, []);

  return (
    <>
      {ready ? (
        <div>
          <div className="top-content">
            <Input
              isClearable
              className="w-full sm:max-w-[200px]"
              placeholder="Search by delicacy..."
              startContent={<BiSearch />}
              value={filterValue}
              onClear={() => onClear()}
              onValueChange={setFilterValue}
            />
          </div>
          <Spacer y={4} />
          <Table
            aria-label="Example table with client side pagination"
            bottomContent={
              <div className="flex w-full justify-center">
                <Pagination
                  isCompact
                  showControls
                  showShadow
                  color="primary"
                  page={page}
                  total={pages}
                  onChange={(page) => setPage(page)}
                />
              </div>
            }
            classNames={{
              wrapper: "min-h-[222px]",
            }}
          >
            <TableHeader>
              <TableColumn>VARIATION</TableColumn>
              <TableColumn>QUANTITY</TableColumn>
              <TableColumn>EXPIRY</TableColumn>
              <TableColumn>ARRIVAL</TableColumn>
              <TableColumn>SUPPLIER</TableColumn>
              <TableColumn>STATUS</TableColumn>
              <TableColumn>PRICE </TableColumn>
              <TableColumn>STOCK VALUE</TableColumn>
              <TableColumn>ACTION </TableColumn>
            </TableHeader>


            <TableBody items={items}>
              {(item) => (
                <TableRow key={item.id}>
                 
                  <TableCell>{capitalize(item.variation.name)}</TableCell>
                  <TableCell>{item.quantity}</TableCell>
                  <TableCell>{formatDate(item.expiry_date)}</TableCell>
                  <TableCell>{formatDate(item.arrival_date)}</TableCell>
                  <TableCell>{capitalize(item.supplier.name)}</TableCell>
                  <TableCell>
                    {getItemStatus(item) === "in" ? (
                      <Chip variant="flat" color="success">
                        In-Stock
                      </Chip>
                    ) : getItemStatus(item) === "out" ? (
                      <Chip variant="flat" color="danger">
                        Out-Stock
                      </Chip>
                    ) : (
                      <Chip variant="flat" color="warning">
                        Low-Stock
                      </Chip>
                    )}
                  </TableCell>
                  <TableCell>&#8369;&nbsp;{item.variation.price}</TableCell>
                  <TableCell>
                    &#8369;&nbsp;{calculateStockValue(item)}
                  </TableCell>
                  <TableCell>
                    <Dropdown>
                      <DropdownTrigger>
                        <Button isIconOnly radius="full" variant="light">
                          <BiDotsVerticalRounded size={20} color="#a1a1aa" />
                        </Button>
                      </DropdownTrigger>
                      <DropdownMenu
                        variant="flat"
                        aria-label="Dropdown menu with shortcut"
                      >
                        <DropdownItem key="view">Details</DropdownItem>
                        <DropdownItem key="edit">Edit</DropdownItem>
                        <DropdownItem
                          key="delete"
                          className="text-danger"
                          color="danger"
                        >
                          Delete file
                        </DropdownItem>
                      </DropdownMenu>
                    </Dropdown>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
          <Spacer y={4} />
          <span className="text-default-400 text-small">
            Total {inventoryItems.length} items
          </span>
          <Spacer y={4} />
        </div>
      ) : (
        <Loading />
      )}
    </>
  );
};

export default Inventory;
