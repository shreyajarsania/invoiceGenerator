// HomeScreen.js
import React, { useEffect, useState, useRef } from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  FlatList,
  ScrollView,
} from "react-native";
import { Divider } from "react-native-paper";
import DropdownComp from "../Components/DropdownComp";
import { unstable_batchedUpdates } from "react-dom";
import { TextInput } from "react-native";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from "moment";

const SaleView = ({ history }) => {
  const [fixedText, setFixedText] = useState({
    invoiceStr: "",
    invoiceNo: "",
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
          discount: "10000",
        },
        {
          label: "itemNo. 2",
          value: "2",
          rate: "200000",
          discount: "5000",
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
        },
        {
          label: "Item",
          keyName: "item",
          width: "310px",
          dropdown: false,
        },
        {
          label: "Qty",
          keyName: "qty",
          width: "100px",
          dropdown: false,
        },
        {
          label: "Rate@",
          keyName: "rate",
          width: "100px",
          dropdown: false,
        },
        {
          label: "Discount",
          keyName: "discount",
          width: "100px",
          dropdown: false,
        },
        {
          label: "Amount",
          keyName: "amount",
          width: "100px",
          dropdown: false,
        },
        {
          label: "GST%",
          keyName: "gst",
          width: "100px",
          dropdown: true,
        },
        {
          label: "Net Amount",
          keyName: "netAmt",
          width: "100px",
          dropdown: false,
        },
      ];
      setHeaderList(headerListTemp);
    });
  };

  useEffect(() => {
    setDataValues();
  }, []);

  return (
    <View
      style={{
        borderRadius: 5,
        borderWidth: 1,
        flex: 1,
        padding: 10,
        margin: 30,
      }}
    >
      <Text style={{ fontWeight: "bold", fontSize: 18 }}>
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
          <View style={{ zIndex: 2000 }}>
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
          zIndex: -1000,
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
          zIndex: -1000,
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

            //TODO: add qty when same
            let qty = 1;
            selectedItemListTemp.push({
              sno: selectedItemListTemp.length + 1 + ".",
              item: item.label,
              qty: qty,
              rate: item.rate,
              discount: item.discount,
              amount: parseFloat(item.rate) * qty - parseFloat(item.discount),
              gst: "",
              netAmt: "",
            });

            setSelectedItemList(selectedItemListTemp);
          }}
        />
      </View>
      {/* Part 4 */}

      {/* Part 4 */}

      <ScrollView horizontal={true} style={{ flex: 1 }}>
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
          <View
            style={{
              flex: 1,
            }}
          >
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
                      return (
                        <View style={{ width: headerValues.width, flex: 1 }}>
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
                                  setSelectedItemList(selectedItemListTemp);
                                }}
                              />

                              <Text style={{ fontSize: 12 }}>
                                {selectedMapItem[
                                  headerValues.keyName
                                ].amt?.toString()}
                              </Text>
                            </View>
                          ) : (
                            <Text>{selectedMapItem[headerValues.keyName]}</Text>
                          )}
                        </View>
                      );
                    }}
                  />
                </View>
              );
            })}
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  input: {},
});

export default SaleView;
