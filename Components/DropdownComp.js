// HomeScreen.js
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Dropdown } from "react-native-element-dropdown";

const DropdownComp = (props) => {
  let { data, selectedValue, setData, label, placeholder, dropdownCompValue } =
    props;
  return (
    <View>
      <Text style={{ fontSize: 12 }}>{label}</Text>
      <Dropdown
        style={[styles.dropdown, dropdownCompValue]}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        iconStyle={styles.iconStyle}
        data={data}
        search
        dropdownPosition={"bottom"}
        maxHeight={300}
        labelField="label"
        valueField="value"
        placeholder={placeholder}
        searchPlaceholder="Search..."
        value={selectedValue}
        onChange={setData}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    padding: 16,
  },
  dropdown: {
    height: 30,
    borderColor: "gray",
    borderWidth: 0.5,
    borderRadius: 0,
    paddingHorizontal: 8,
  },
  icon: {
    marginRight: 5,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 20,
    width: "100%",
    fontSize: 12,
  },
});
export default DropdownComp;
