// HomeScreen.js
import React, { useEffect, useState, useRef } from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  FlatList,
  ScrollView,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import { Divider } from "react-native-paper";
import DropdownComp from "../Components/DropdownComp";
import { unstable_batchedUpdates } from "react-dom";
import { TextInput } from "react-native";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { MaterialIcons } from "@expo/vector-icons";

import { useNavigate } from "react-router-dom";

const SaleView = () => {
  const navigate = useNavigate();
  const [fixedText, setFixedText] = useState({
    invoiceStr: "",
    invoiceNo: "",
    tnc: "",
    note: "",
    cgst: "",
    sgst: "",
    extraDiscount: "",
    deliveryCharges: "",
    roundOff: "",
    grandTotal: "",
    totalQty: "",
    totalDiscount: "",
    totalTax: "",
  });
  const [dropdownList, setDropdownList] = useState({
    accountType: [],
    salesVoucher: [],
    billTo: [],
    billAddress: [],
    shippingAddress: [],
    itemList: [],
    gst: [],
  });
  const [selectedDDValue, setSelectedDDValue] = useState({
    accountType: {},
    salesVoucher: {},
    billTo: {},
    billAddress: {},
    shippingAddress: {},
    itemList: {},
    gst: {},
  });
  const [dateValue, setDateValue] = useState({
    issueDate: "",
    dueDate: "",
  });

  const [selectedItemList, setSelectedItemList] = useState([]);
  const [headerList, setHeaderList] = useState([]);

  const handleDateChange = (date, dateType) => {
    let dateValueTemp = dateValue;
    dateValueTemp[dateType] = date;
    setDateValue({ ...dateValueTemp });
  };

  const setDataValues = () => {
    unstable_batchedUpdates(() => {
      let tempFixedText = fixedText;
      tempFixedText.invoiceStr = "INV/JPR/";
      tempFixedText.invoiceYearStr = "FY/2023";
      tempFixedText.tnc =
        "1.Payment Terms: Just Pay! etc. \n2.Delivery: Charges! etc";
      tempFixedText.cgst = "45,000";
      tempFixedText.sgst = "45,000";
      tempFixedText.extraDiscount = "635.21";
      tempFixedText.deliveryCharges = "1200.21";
      tempFixedText.roundOff = "0.04";
      tempFixedText.invoiceNo = "";
      tempFixedText.note = "";
      tempFixedText.grandTotal = "";
      tempFixedText.totalQty = "";
      tempFixedText.totalDiscount = "";
      tempFixedText.totalTax = "";
      setFixedText({ ...tempFixedText });

      let dropdownListTemp = dropdownList;
      dropdownListTemp.accountType = [
        { label: "accountType 1", value: "1" },
        { label: "accountType 2", value: "2" },
        { label: "accountType 3", value: "3" },
        { label: "accountType 4", value: "4" },
        { label: "accountType 5", value: "5" },
        { label: "accountType 6", value: "6" },
        { label: "accountType 7", value: "7" },
        { label: "accountType 8", value: "8" },
      ];
      dropdownListTemp.salesVoucher = [
        { label: "sales Vo 1", value: "1" },
        { label: "sales Vo 2", value: "2" },
        { label: "sales Vo 3", value: "3" },
        { label: "sales Vo 4", value: "4" },
        { label: "sales Vo 5", value: "5" },
        { label: "sales Vo 6", value: "6" },
        { label: "sales Vo 7", value: "7" },
        { label: "sales Vo 8", value: "8" },
      ];
      dropdownListTemp.billTo = [
        {
          label: "bill to 1",
          value: "1",
          fields: ["bill to 1", "+911323 1", "abc1.com"],
        },
        {
          label: "bill to 2",
          value: "2",
          fields: ["bill to 2", "+911323 2", "abc2.com"],
        },
        {
          label: "bill to 3",
          value: "3",
          fields: ["bill to 3", "+911323 3", "abc3.com"],
        },
      ];
      dropdownListTemp.billAddress = [
        {
          label: "bill Address 1",
          value: "1",
          fields: ["bill Address 1 N", "+911323 1", "abc, 123"],
          gstIn: "0erdktgghg1",
        },
        {
          label: "bill Address 2",
          value: "2",
          fields: ["bill Address 2 N", "+911323 2", "xyz, 234"],
          gstIn: "0erdktgghg2",
        },
        {
          label: "bill Address 3",
          value: "3",
          fields: ["bill Address 3 N", "+911323 3", "ijk, 456"],
          gstIn: "0erdktgghg3",
        },
      ];
      dropdownListTemp.shippingAddress = [
        {
          label: "shipping add 1",
          value: "1",
          fields: ["shipping add 1 N", "+911323 1", "abc, 123, qw"],
        },
        {
          label: "shipping add 2",
          value: "2",
          fields: ["shipping add 2 N", "+911323 2", "xyz, 234, qw"],
        },
        {
          label: "shipping add 3",
          value: "3",
          fields: ["shipping add 3 N", "+911323 3", "ijk, 456, qw"],
        },
      ];
      dropdownListTemp.itemList = [
        {
          label: "itemNo. 1",
          value: "1",
          rate: "155000",
          discount: "5000",
        },
        {
          label: "itemNo. 2",
          value: "2",
          rate: "102000",
          discount: "2000",
        },
        {
          label: "itemNo. 3",
          value: "3",
          rate: "250000",
          discount: "4000",
        },
      ];
      dropdownListTemp.gst = [
        {
          label: "0%",
          value: "1",
          valueinint: 0,
        },
        {
          label: "5%",
          value: "2",
          valueinint: 5,
        },
        {
          label: "12%",
          value: "3",
          valueinint: 12,
        },
        {
          label: "18%",
          value: "4",
          valueinint: 18,
        },
      ];
      setDropdownList({ ...dropdownListTemp });

      let dateValueTemp = dateValue;
      dateValueTemp.issueDate = new Date();
      dateValueTemp.dueDate = new Date();
      setDateValue({ ...dateValueTemp });

      let headerListTemp = headerList;
      headerListTemp = [
        {
          label: "S.No.",
          keyName: "sno",
          width: "100px",
          dropdown: false,
          total: "",
          pdfWidth: 40,
        },
        {
          label: "Item",
          keyName: "item",
          width: "310px",
          dropdown: false,
          total: "",
          pdfWidth: 180,
        },
        {
          label: "Qty",
          keyName: "qty",
          width: "100px",
          dropdown: false,
          total: "0",
          pdfWidth: 30,
        },
        {
          label: "Rate@",
          keyName: "rate",
          width: "100px",
          dropdown: false,
          total: "0",
          pdfWidth: 50,
        },
        {
          label: "Discount",
          keyName: "discount",
          width: "100px",
          dropdown: false,
          total: "0",
          pdfWidth: 50,
        },
        {
          label: "Amount",
          keyName: "amount",
          width: "100px",
          dropdown: false,
          total: "0",
          pdfWidth: 80,
        },
        {
          label: "GST%",
          keyName: "gst",
          width: "100px",
          dropdown: true,
          total: "0",
          pdfWidth: 50,
        },
        {
          label: "Net Amount",
          keyName: "netAmt",
          width: "100px",
          dropdown: false,
          total: "0",
          pdfWidth: 80,
        },
      ];
      setHeaderList(headerListTemp);
    });
  };

  useEffect(() => {
    setDataValues();
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <ImageBackground
        source={require("../assets/backgroundImg.jpg")}
        resizeMode="cover"
        style={styles.mainContainer}
      >
        <Text style={{ fontWeight: "bold", fontSize: 20 }}>
          Create Sales Invoice
        </Text>
        <Divider bold={true} style={{ height: 2, backgroundColor: "black" }} />
        {/*Part 1*/}
        <View
          style={{
            flexWrap: "wrap",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <DropdownComp
            label={"Account Type"}
            data={dropdownList.accountType}
            placeholder={"Sales A/c"}
            dropdownCompValue={{ minWidth: "150px" }}
            selectedValue={selectedDDValue.accountType}
            setData={(item) => {
              let tempSelecteValue = selectedDDValue;
              tempSelecteValue.accountType = item;
              setSelectedDDValue({ ...tempSelecteValue });
            }}
          />
          <View
            style={{
              flexDirection: "row",
              marginHorizontal: 10,
              marginBottom: 10,
            }}
          >
            <DropdownComp
              label={"Invoice No."}
              data={dropdownList.salesVoucher}
              placeholder={"Sales Voucher"}
              selectedValue={selectedDDValue.salesVoucher}
              setData={(item) => {
                let tempSelecteValue = selectedDDValue;
                tempSelecteValue.salesVoucher = item;
                setSelectedDDValue({ ...tempSelecteValue });
              }}
            />
            <View
              style={{
                borderWidth: 1,
                marginTop: 16,
                justifyContent: "center",
                paddingHorizontal: 4,
                height: 30,
                backgroundColor: "grey",
              }}
            >
              <Text>{fixedText.invoiceStr}</Text>
            </View>
            <TextInput
              style={{
                marginTop: 16,
                borderWidth: 1,
                padding: 10,
                height: 30,
                width: "25%",
              }}
              onChangeText={(item) => {
                let fixedTextTemp = fixedText;
                fixedTextTemp.invoiceNo = item;
                setFixedText({ ...fixedTextTemp });
              }}
              value={fixedText.invoiceNo}
              placeholder="Invoice no."
              keyboardType="numeric"
            />
            <View
              style={{
                borderWidth: 1,
                marginTop: 16,
                justifyContent: "center",
                paddingHorizontal: 4,
                height: 30,
                backgroundColor: "grey",
              }}
            >
              <Text>{fixedText.invoiceYearStr}</Text>
            </View>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              width: "40%",
              maxWidth: "380px",
              flexWrap: "wrap",
            }}
          >
            <View style={{ zIndex: 1 }}>
              <Text style={{ fontSize: 12 }}>{"Issue Date"}</Text>
              <DatePicker
                selected={dateValue.issueDate}
                dateFormat="dd/MM/yyyy"
                onChange={(value) => {
                  handleDateChange(value, "issueDate");
                }}
              />
            </View>
            <View>
              <Text style={{ fontSize: 12 }}>{"Due Date"}</Text>
              <DatePicker
                selected={dateValue.dueDate}
                dateFormat="dd/MM/yyyy"
                onChange={(value) => {
                  handleDateChange(value, "dueDate");
                }}
              />
            </View>
          </View>
        </View>
        {/*Part 2*/}
        <View
          style={{
            flexWrap: "wrap",
            flexDirection: "row",
            justifyContent: "space-between",
            marginTop: 10,
            zIndex: -1,
          }}
        >
          <View>
            <DropdownComp
              label={"Bill To"}
              data={dropdownList.billTo}
              placeholder={"Bill to"}
              selectedValue={selectedDDValue.billTo}
              dropdownCompValue={{ minWidth: "150px" }}
              setData={(item) => {
                let tempSelecteValue = selectedDDValue;
                tempSelecteValue.billTo = item;
                setSelectedDDValue({ ...tempSelecteValue });
              }}
            />
            {Object.keys(selectedDDValue.billTo).length > 0 ? (
              <FlatList
                data={selectedDDValue.billTo.fields}
                keyExtractor={(item, index) => index.toString()}
                style={{ marginTop: 5 }}
                renderItem={({ item, index }) => {
                  return <Text>{item}</Text>;
                }}
              />
            ) : null}
          </View>
          <View style={{ minWidth: "30%" }}>
            <DropdownComp
              label={"Bill Address"}
              data={dropdownList.billAddress}
              placeholder={"Bill Address"}
              selectedValue={selectedDDValue.billAddress}
              setData={(item) => {
                let tempSelecteValue = selectedDDValue;
                tempSelecteValue.billAddress = item;
                setSelectedDDValue({ ...tempSelecteValue });
              }}
            />
            {Object.keys(selectedDDValue.billAddress).length > 0 ? (
              <View style={{ flexDirection: "row" }}>
                <FlatList
                  data={selectedDDValue.billAddress.fields}
                  keyExtractor={(item, index) => index.toString()}
                  style={{ marginTop: 5 }}
                  renderItem={({ item, index }) => {
                    return <Text>{item}</Text>;
                  }}
                />
                <Text>
                  {"GSTIN: "} {selectedDDValue.billAddress.gstIn}
                </Text>
              </View>
            ) : null}
          </View>
          <View style={{ minWidth: "30%" }}>
            <DropdownComp
              label={"Shipping Address"}
              data={dropdownList.shippingAddress}
              placeholder={"Shipping Address"}
              selectedValue={selectedDDValue.shippingAddress}
              setData={(item) => {
                let tempSelecteValue = selectedDDValue;
                tempSelecteValue.shippingAddress = item;
                setSelectedDDValue({ ...tempSelecteValue });
              }}
            />
            {Object.keys(selectedDDValue.shippingAddress).length > 0 ? (
              <FlatList
                data={selectedDDValue.shippingAddress.fields}
                keyExtractor={(item, index) => index.toString()}
                style={{ marginTop: 5 }}
                renderItem={({ item, index }) => {
                  return <Text>{item}</Text>;
                }}
              />
            ) : null}
          </View>
        </View>
        {/*Part 3*/}
        <View
          style={{
            zIndex: -1,
          }}
        >
          <DropdownComp
            label={""}
            data={dropdownList.itemList}
            placeholder={"Add Item"}
            selectedValue={""}
            dropdownCompValue={{ maxWidth: "65%", marginTop: 15 }}
            setData={(item) => {
              let selectedItemListTemp = JSON.parse(
                JSON.stringify(selectedItemList)
              );
              let found = false,
                totalQty = 0,
                totalDiscount = 0,
                totalAmount = 0,
                totalGst = 0,
                totalNetAmount = 0;
              selectedItemListTemp.map((itemx) => {
                if (itemx.value == item.value) {
                  found = true;
                  itemx.qty += 1;
                  itemx.discount = parseFloat(item.discount) * itemx.qty;
                  itemx.amount =
                    parseFloat(item.rate) * itemx.qty -
                    parseFloat(itemx.discount);
                  if (itemx.gst !== "") {
                    itemx.gst.amt =
                      parseFloat(itemx.amount) * (itemx.gst.valueinint / 100);
                    itemx.netAmt =
                      parseFloat(itemx.amount) +
                      parseFloat(itemx.amount) * (itemx.gst.valueinint / 100);
                  }
                }
              });
              //TODO: add qty when same
              let qty = 1;
              if (!found) {
                selectedItemListTemp.push({
                  sno: selectedItemListTemp.length + 1 + ".",
                  item: item.label,
                  qty: qty,
                  rate: item.rate,
                  discount: item.discount,
                  amount:
                    parseFloat(item.rate) * qty - parseFloat(item.discount),
                  gst: "",
                  netAmt: "",
                  value: item.value,
                });
              }
              selectedItemListTemp.map((itemx, index) => {
                itemx.sno = index + 1;
                totalQty += parseFloat(itemx.qty);
                totalDiscount += parseFloat(itemx.discount);
                totalAmount += parseFloat(itemx.amount);
                totalGst += itemx.gst !== "" ? parseFloat(itemx.gst.amt) : 0;
                totalNetAmount += parseFloat(itemx.netAmt);
              });
              setSelectedItemList(selectedItemListTemp);

              let tempHeaderList = JSON.parse(JSON.stringify(headerList));
              tempHeaderList.map((itemy) => {
                switch (itemy.keyName) {
                  case "qty":
                    itemy.total = totalQty;
                    break;
                  case "discount":
                    itemy.total = totalDiscount;
                    break;
                  case "amount":
                    itemy.total = totalAmount;
                    break;
                  case "gst":
                    itemy.total = totalGst;
                    break;
                  case "netAmt":
                    itemy.total = totalNetAmount;
                    break;
                }
              });

              setHeaderList(tempHeaderList);

              let fixedTexttemp = fixedText;
              fixedTexttemp.grandTotal =
                parseFloat(totalNetAmount) +
                parseFloat(fixedText.deliveryCharges) -
                parseFloat(fixedText.extraDiscount);
              fixedTexttemp.totalQty = totalQty;
              fixedTexttemp.totalDiscount =
                parseFloat(totalDiscount) + parseFloat(fixedText.extraDiscount);
              fixedTexttemp.totalTax = totalGst;

              setFixedText({ ...fixedTexttemp });
            }}
          />
        </View>
        {/* Part 4 */}

        <ScrollView horizontal={true} style={{ flex: 1, zIndex: -1 }}>
          <View style={{ flex: 1, flexGrow: 1 }}>
            <View
              style={{
                flex: 1,
                maxHeight: "35px",
              }}
            >
              <FlatList
                data={headerList}
                keyExtractor={(item, index) => index.toString()}
                style={{
                  marginTop: 5,
                  borderTopWidth: 1,
                  borderBottomWidth: 1,
                  flex: 1,
                }}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                renderItem={({ item, index }) => {
                  return (
                    <View style={{ width: item.width, flex: 1 }}>
                      <Text style={{ fontWeight: "bold" }}>{item.label}</Text>
                    </View>
                  );
                }}
              />
            </View>
            <View>
              {selectedItemList.map((item, index) => {
                let selectedMapItem = item,
                  selectedMapIndex = index;
                return (
                  <View>
                    <FlatList
                      data={Object.keys(selectedMapItem)}
                      keyExtractor={(item, index) => index.toString()}
                      style={{
                        marginTop: 5,
                        flex: 1,
                      }}
                      horizontal={true}
                      showsHorizontalScrollIndicator={false}
                      renderItem={(itemData) => {
                        let headerValues = headerList[itemData.index];
                        if (itemData.item == "value")
                          return (
                            <MaterialIcons
                              name="delete"
                              size={24}
                              color="black"
                              style={{ paddingHorizontal: 10 }}
                              onPress={(item) => {
                                let found = false,
                                  totalQty = 0,
                                  totalDiscount = 0,
                                  totalAmount = 0,
                                  totalGst = 0,
                                  totalNetAmount = 0;
                                let selectedItemListTemp = JSON.parse(
                                  JSON.stringify(selectedItemList)
                                );
                                selectedItemListTemp.map((itemx, indexx) => {
                                  if (itemx.value == selectedMapItem.value) {
                                    if (itemx.qty == 1) {
                                      selectedItemListTemp.splice(indexx, 1);
                                    } else {
                                      itemx.discount =
                                        (parseFloat(itemx.discount) /
                                          parseFloat(itemx.qty)) *
                                        (parseFloat(itemx.qty) - 1);
                                      itemx.qty -= 1;
                                      itemx.amount =
                                        parseFloat(itemx.rate) * itemx.qty -
                                        parseFloat(itemx.discount);
                                      if (itemx.gst !== "") {
                                        itemx.gst.amt =
                                          parseFloat(itemx.amount) *
                                          (itemx.gst.valueinint / 100);
                                        itemx.netAmt =
                                          parseFloat(itemx.amount) +
                                          parseFloat(itemx.amount) *
                                            (itemx.gst.valueinint / 100);
                                      }
                                    }
                                  }
                                });
                                selectedItemListTemp.map((itemx, indexx) => {
                                  itemx.sno = indexx + 1;
                                  totalQty += parseFloat(itemx.qty);
                                  totalDiscount += parseFloat(itemx.discount);
                                  totalAmount += parseFloat(itemx.amount);
                                  totalGst +=
                                    itemx.gst !== ""
                                      ? parseFloat(itemx.gst.amt)
                                      : 0;
                                  totalNetAmount += parseFloat(itemx.netAmt);
                                });
                                setSelectedItemList(selectedItemListTemp);

                                let tempHeaderList = JSON.parse(
                                  JSON.stringify(headerList)
                                );
                                tempHeaderList.map((itemy) => {
                                  switch (itemy.keyName) {
                                    case "qty":
                                      itemy.total = totalQty;
                                      break;
                                    case "discount":
                                      itemy.total = totalDiscount;
                                      break;
                                    case "amount":
                                      itemy.total = totalAmount;
                                      break;
                                    case "gst":
                                      itemy.total = totalGst;
                                      break;
                                    case "netAmt":
                                      itemy.total = totalNetAmount;
                                      break;
                                  }
                                });

                                setHeaderList(tempHeaderList);

                                let fixedTexttemp = fixedText;
                                fixedTexttemp.grandTotal =
                                  parseFloat(totalNetAmount) +
                                  parseFloat(fixedText.deliveryCharges) -
                                  parseFloat(fixedText.extraDiscount);
                                setFixedText({ ...fixedTexttemp });
                                fixedTexttemp.totalQty = totalQty;
                                fixedTexttemp.totalDiscount =
                                  parseFloat(totalDiscount) +
                                  parseFloat(fixedText.extraDiscount);
                                fixedTexttemp.totalTax = totalGst;
                                setFixedText({ ...fixedTexttemp });
                              }}
                            />
                          );
                        return (
                          <View
                            style={{
                              width: headerValues.width,
                              flex: 1,
                            }}
                          >
                            {headerValues.dropdown ? (
                              <View>
                                <DropdownComp
                                  label={""}
                                  data={dropdownList.gst}
                                  placeholder={"GST%"}
                                  selectedValue={selectedMapItem.gst.value}
                                  dropdownCompValue={{
                                    marginRight: 0,
                                    maxHeight: "20px",
                                    maxWidth: "70px",
                                  }}
                                  setData={(item) => {
                                    let selectedItemListTemp = JSON.parse(
                                      JSON.stringify(selectedItemList)
                                    );

                                    //TODO: add qty when same
                                    let qty = 1;
                                    selectedItemListTemp[selectedMapIndex].gst =
                                      item;
                                    selectedItemListTemp[
                                      selectedMapIndex
                                    ].gst.amt =
                                      parseFloat(
                                        selectedItemListTemp[selectedMapIndex]
                                          .amount
                                      ) *
                                      (item.valueinint / 100);
                                    selectedItemListTemp[
                                      selectedMapIndex
                                    ].netAmt =
                                      parseFloat(
                                        selectedItemListTemp[selectedMapIndex]
                                          .amount
                                      ) +
                                      parseFloat(
                                        selectedItemListTemp[selectedMapIndex]
                                          .amount
                                      ) *
                                        (item.valueinint / 100);

                                    let totalQty = 0,
                                      totalDiscount = 0,
                                      totalAmount = 0,
                                      totalGst = 0,
                                      totalNetAmount = 0;
                                    selectedItemListTemp.map(
                                      (itemx, indexx) => {
                                        itemx.sno = indexx + 1;
                                        totalQty += parseFloat(itemx.qty);
                                        totalDiscount += parseFloat(
                                          itemx.discount
                                        );
                                        totalAmount += parseFloat(itemx.amount);
                                        totalGst +=
                                          itemx.gst !== ""
                                            ? parseFloat(itemx.gst.amt)
                                            : 0;
                                        totalNetAmount += parseFloat(
                                          itemx.netAmt
                                        );
                                      }
                                    );
                                    setSelectedItemList(selectedItemListTemp);

                                    let tempHeaderList = JSON.parse(
                                      JSON.stringify(headerList)
                                    );
                                    tempHeaderList.map((itemy) => {
                                      switch (itemy.keyName) {
                                        case "qty":
                                          itemy.total = totalQty;
                                          break;
                                        case "discount":
                                          itemy.total = totalDiscount;
                                          break;
                                        case "amount":
                                          itemy.total = totalAmount;
                                          break;
                                        case "gst":
                                          itemy.total = totalGst;
                                          break;
                                        case "netAmt":
                                          itemy.total = totalNetAmount;
                                          break;
                                      }
                                    });

                                    setHeaderList(tempHeaderList);

                                    let fixedTexttemp = fixedText;
                                    fixedTexttemp.grandTotal =
                                      parseFloat(totalNetAmount) +
                                      parseFloat(fixedText.deliveryCharges) -
                                      parseFloat(fixedText.extraDiscount);
                                    setFixedText({ ...fixedTexttemp });
                                    fixedTexttemp.totalQty = totalQty;
                                    fixedTexttemp.totalDiscount =
                                      parseFloat(totalDiscount) +
                                      parseFloat(fixedText.extraDiscount);
                                    fixedTexttemp.totalTax = totalGst;

                                    setFixedText({ ...fixedTexttemp });
                                  }}
                                />

                                <Text style={{ fontSize: 12 }}>
                                  {selectedMapItem[
                                    headerValues.keyName
                                  ].amt?.toString()}
                                </Text>
                              </View>
                            ) : (
                              <Text>
                                {selectedMapItem[headerValues.keyName]}
                              </Text>
                            )}
                          </View>
                        );
                      }}
                    />
                  </View>
                );
              })}
            </View>
            {selectedItemList.length == 0 ? null : (
              <View
                style={{
                  flex: 1,
                  maxHeight: "35px",
                }}
              >
                <FlatList
                  data={headerList}
                  keyExtractor={(item, index) => index.toString()}
                  style={{
                    marginTop: 5,
                    borderTopWidth: 1,
                    borderBottomWidth: 1,
                    flex: 1,
                  }}
                  horizontal={true}
                  showsHorizontalScrollIndicator={false}
                  renderItem={({ item, index }) => {
                    return (
                      <View style={{ width: item.width, flex: 1 }}>
                        <Text style={{ fontWeight: "bold" }}>{item.total}</Text>
                      </View>
                    );
                  }}
                />
              </View>
            )}
          </View>
        </ScrollView>

        {/* Part 5 */}
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            flexWrap: "wrap-reverse",
            zIndex: -1,
          }}
        >
          <View style={{ width: "40%" }}>
            <View style={{ borderWidth: 1 }}>
              <Text style={{ fontSize: 12, fontWeight: "bold" }}>
                {"Term & Conditions:"}
              </Text>
              <Text style={{ fontSize: 12 }}>{fixedText.tnc}</Text>
            </View>
            <View style={{ borderWidth: 1, marginTop: 10 }}>
              <Text style={{ fontSize: 12, fontWeight: "bold" }}>
                {"Notes:"}
              </Text>
              <TextInput
                style={{
                  minHeight: "50px",
                  fontWeight: 12,
                }}
                onChangeText={(item) => {
                  let fixedTextTemp = fixedText;
                  fixedTextTemp.note = item;
                  setFixedText({ ...fixedTextTemp });
                }}
                value={fixedText.note}
                multiline={true}
                placeholder="Please Enter Notes"
              />
            </View>
          </View>
          <View style={{ justifyContent: "end" }}>
            <Text
              style={{
                padding: 5,
                borderWidth: 1,
                fontWeight: "bold",
                alignSelf: "center",
              }}
            >
              CGST: {fixedText.cgst}
              {"\n"}SGST: {fixedText.sgst}
            </Text>
          </View>
          <View>
            <View style={{ flexDirection: "row" }}>
              <Text style={{ width: "120px", alignSelf: "center" }}>
                Extra Discount
              </Text>
              <Text
                style={{
                  width: "140px",
                  borderWidth: 1,
                  margin: 5,
                  padding: 2,
                }}
              >
                {"-"}
                {fixedText.extraDiscount}{" "}
              </Text>
            </View>
            <View style={{ flexDirection: "row" }}>
              <Text style={{ width: "120px", alignSelf: "center" }}>
                Delivery Charges
              </Text>
              <Text
                style={{
                  width: "140px",
                  borderWidth: 1,
                  margin: 5,
                  padding: 2,
                }}
              >
                {fixedText.deliveryCharges}{" "}
              </Text>
            </View>
            <View style={{ flexDirection: "row" }}>
              <Text style={{ width: "120px", alignSelf: "center" }}>
                Round Off
              </Text>
              <Text
                style={{
                  width: "140px",
                  borderWidth: 1,
                  margin: 5,
                  padding: 2,
                }}
              >
                {fixedText.roundOff}{" "}
              </Text>
            </View>
            <View style={{ flexDirection: "row" }}>
              <Text
                style={{
                  width: "120px",
                  fontWeight: "bold",
                  alignSelf: "center",
                }}
              >
                Grand Total
              </Text>
              <Text
                style={{
                  width: "140px",
                  fontWeight: "bold",
                  margin: 5,
                }}
              >
                ₹{fixedText.grandTotal}
              </Text>
            </View>
          </View>
        </View>
        {/* Part 6 */}
        <Divider
          bold={true}
          style={{ marginVertical: 10, height: 2, backgroundColor: "black" }}
        />
        <View
          style={{
            flexWrap: "wrap",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <View style={{ flexWrap: "wrap", flexDirection: "row" }}>
            <View style={{ flexDirection: "row", marginRight: 7 }}>
              <Text
                style={{
                  fontSize: 17,
                  fontWeight: "bold",
                  alignSelf: "center",
                }}
              >
                Total Qty:{" "}
              </Text>
              <Text style={{ fontSize: 17, alignSelf: "center" }}>
                {fixedText.totalQty}
              </Text>
            </View>
            <View style={{ flexDirection: "row", marginRight: 7 }}>
              <Text
                style={{
                  fontSize: 17,
                  fontWeight: "bold",
                  alignSelf: "center",
                }}
              >
                {"-"}Total Discount:{" "}
              </Text>
              <Text style={{ fontSize: 17, alignSelf: "center" }}>
                {fixedText.totalDiscount}
              </Text>
            </View>
            <View style={{ flexDirection: "row", marginRight: 7 }}>
              <Text
                style={{
                  fontSize: 17,
                  fontWeight: "bold",
                  alignSelf: "center",
                }}
              >
                Total Tax:{" "}
              </Text>
              <Text style={{ fontSize: 17, alignSelf: "center" }}>
                {fixedText.totalTax}
              </Text>
            </View>
            <View style={{ flexDirection: "row", marginRight: 7 }}>
              <Text
                style={{
                  fontSize: 17,
                  fontWeight: "bold",
                  borderBottomWidth: 1,
                  alignSelf: "center",
                }}
              >
                Grand Total :{" "}
              </Text>
              <Text
                style={{
                  fontSize: 17,
                  fontWeight: "bold",
                  borderBottomWidth: 1,
                  alignSelf: "center",
                }}
              >
                {"₹"}
                {fixedText.grandTotal}
              </Text>
            </View>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <TouchableOpacity
              style={{
                borderWidth: 0.5,
                backgroundColor: "red",
                padding: 10,
                borderRadius: 10,
                marginRight: 10,
              }}
              onPress={() => {
                setDataValues();
                setSelectedItemList(JSON.parse(JSON.stringify([])));
                let selectedDDValueTemp = selectedDDValue;
                Object.keys(selectedDDValue).map((item) => {
                  selectedDDValueTemp[item] = {};
                });
                setSelectedDDValue({ ...selectedDDValueTemp });
              }}
            >
              <Text style={{ color: "white" }}>CANCLE</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                borderWidth: 0.5,
                backgroundColor: "#55AAFF",
                padding: 10,
                borderRadius: 10,
              }}
              onPress={() => {
                const state = {
                  data: JSON.stringify({
                    fixedText: fixedText,
                    selectedDDValue: selectedDDValue,
                    selectedItemList: selectedItemList,
                    headerList: headerList,
                    dateValue: dateValue,
                  }),
                };

                navigate(`/pdfScreen?${new URLSearchParams(state).toString()}`);
              }}
            >
              <Text style={{ color: "white" }}>SUBMIT</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    overflow: "hidden",
    borderRadius: 10,
    borderWidth: 2,
    flex: 1,
    padding: 10,
    margin: 30,
    maxWidth: "80%",
    alignSelf: "center",
    zIndex: -2,
  },
});

export default SaleView;
