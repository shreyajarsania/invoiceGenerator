import React, { useEffect } from "react";
import { View } from "react-native";
import { PDFDocument, PageSizes, StandardFonts, degrees, rgb } from "pdf-lib";
import moment from "moment";
import { useLocation } from "react-router-dom";

const GeneratePdf = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const {
    fixedText,
    selectedDDValue,
    selectedItemList,
    headerList,
    dateValue,
  } = JSON.parse(searchParams.get("data"));

  const pdfRef = React.useRef(null);

  const generatePdfStyle2 = async () => {
    const pdfDoc = await PDFDocument.create();
    const page = pdfDoc.addPage(PageSizes.A4);
    const totalPageWidth = page.getSize().width;
    const totalPageHeigth = page.getSize().height;

    const helveticaFont = await pdfDoc.embedFont(StandardFonts.Helvetica);
    const timesRomanFont = await pdfDoc.embedFont(StandardFonts.TimesRoman);

    //Part 1
    page.drawText("TAX INVOICE", {
      x: 10,
      y: totalPageHeigth - 20,
      size: 16,
      font: helveticaFont,
    });

    page.drawText("OriginalCopy", {
      x: totalPageWidth - 80,
      y: totalPageHeigth - 16,
      size: 12,
      font: helveticaFont,
      maxWidth: totalPageWidth,
    });
    page.drawText("This is computer generate invoice", {
      x: totalPageWidth - 120,
      y: totalPageHeigth - 24,
      size: 8,
      font: timesRomanFont,
      maxWidth: totalPageWidth,
    });

    const startX = 10;
    const startY = totalPageHeigth - 185;
    const width = 265;
    const height = 160;

    page.drawRectangle({
      x: startX,
      y: 10,
      width: totalPageWidth - 20,
      height: totalPageHeigth - 35,
      borderColor: rgb(0, 0, 0),
      borderWidth: 1,
      fill: rgb(1, 1, 1),
    });

    // Draw the textbox shape with a border
    page.drawRectangle({
      x: startX,
      y: startY,
      width,
      height,
      borderColor: rgb(0, 0, 0),
      borderWidth: 1,
      fill: rgb(1, 1, 1),
    });

    // Load the local image using Expo's Asset module
    const imagePath = require("../assets/Intel_logo.jpg");
    const imageResponse = await fetch(imagePath);
    const imageBlob = await imageResponse.blob();
    const reader = new FileReader();

    // Convert the image blob to a base64-encoded string
    const imageBytesPromise = new Promise((resolve, reject) => {
      reader.onloadend = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(imageBlob);
    });
    const imageBytes = await imageBytesPromise;

    // Embed the image into the document
    const image = await pdfDoc.embedJpg(imageBytes);

    // Calculate the image dimensions and position within the textbox
    const imageWidth = width - 10; // Adjust the width to fit within the textbox
    const imageHeight = (50 * 56) / 60;
    const imageX = startX + 5; // Adjust the x-coordinate for the image
    const imageY = startY + 100; // Adjust the y-coordinate for the image

    // Draw the image on the page
    page.drawImage(image, {
      x: imageX,
      y: imageY,
      width: 60,
      height: 56,
      rotate: degrees(0), // Adjust rotation if needed
    });

    let lineUsed = 0;
    selectedDDValue.billTo.fields.map((item) => {
      lineUsed =
        1 +
        lineUsed +
        renderText(
          item,
          startX,
          startY - 50 - lineUsed * 10,
          height,
          width,
          page,
          timesRomanFont
        );
    });
    lineUsed += 1;
    selectedDDValue.billAddress.fields.map((item) => {
      lineUsed =
        1 +
        lineUsed +
        renderText(
          item,
          startX,
          startY - 50 - lineUsed * 10,
          height,
          width,
          page,
          timesRomanFont
        );
    });

    lineUsed += 1;
    lineUsed =
      1 +
      lineUsed +
      renderText(
        `GSTIN: ${selectedDDValue.billAddress.gstIn}`,
        startX,
        startY - 50 - lineUsed * 10,
        height,
        width,
        page,
        helveticaFont
      );

    let startTableX = startX + width;
    let startTableX2 = startTableX + 155;
    let startTableY = startY;
    renderCell(
      startX,
      startY,
      height,
      width,
      lineUsed,
      startTableX,
      startTableY,
      page,
      timesRomanFont,
      helveticaFont,
      "Dispatch through",
      "BlueDart"
    );
    renderCell(
      startX,
      startY,
      height,
      width,
      lineUsed,
      startTableX2,
      startTableY,
      page,
      timesRomanFont,
      helveticaFont,
      `E-way Bill ref:`,
      ``
    );
    startTableY += 32;
    renderCell(
      startX,
      startY,
      height,
      width,
      lineUsed,
      startTableX,
      startTableY,
      page,
      timesRomanFont,
      helveticaFont,
      "Dispatch No.",
      "123459475750392747"
    );
    renderCell(
      startX,
      startY,
      height,
      width,
      lineUsed,
      startTableX2,
      startTableY,
      page,
      timesRomanFont,
      helveticaFont,
      `Dispatch Date`,
      `${moment().format("DD/MM/YYYY")}`
    );
    startTableY += 32;
    renderCell(
      startX,
      startY,
      height,
      width,
      lineUsed,
      startTableX,
      startTableY,
      page,
      timesRomanFont,
      helveticaFont,
      "Buyer Order No.",
      "p/12/JPR/FY23"
    );
    renderCell(
      startX,
      startY,
      height,
      width,
      lineUsed,
      startTableX2,
      startTableY,
      page,
      timesRomanFont,
      helveticaFont,
      `Buyer Order Date`,
      `${moment().format("DD/MM/YYYY")}`
    );
    startTableY += 32;
    renderCell(
      startX,
      startY,
      height,
      width,
      lineUsed,
      startTableX,
      startTableY,
      page,
      timesRomanFont,
      helveticaFont,
      "Total Amount",
      `${fixedText.grandTotal}`
    );
    renderCell(
      startX,
      startY,
      height,
      width,
      lineUsed,
      startTableX2,
      startTableY,
      page,
      timesRomanFont,
      helveticaFont,
      `Due Date`,
      `${moment(dateValue.dueDate).format("DD/MM/YYYY")}`
    );
    startTableY += 32;
    renderCell(
      startX,
      startY,
      height,
      width,
      lineUsed,
      startTableX,
      startTableY,
      page,
      timesRomanFont,
      helveticaFont,
      `Invoice No`,
      `${selectedDDValue.salesVoucher?.label ?? ""}${fixedText.invoiceStr}${
        fixedText.invoiceNo
      }/${fixedText.invoiceYearStr}`
    );

    renderCell(
      startX,
      startY,
      height,
      width,
      lineUsed,
      startTableX2,
      startTableY,
      page,
      timesRomanFont,
      helveticaFont,
      `Issue Date`,
      `${moment(dateValue.issueDate).format("DD/MM/YYYY")}`
    );

    //Part2

    page.drawRectangle({
      x: startX + width,
      y: startY - height + 40,
      width: 0,
      height: height - 40,
      borderColor: rgb(0.7, 0.7, 0.7),
      borderWidth: 1,
      fill: rgb(1, 1, 1),
    });

    let BillingAddBoxY = startY - lineUsed * 10 - 10;
    let BillingAddBoxHeight = 100;
    lineUsed = 0;
    lineUsed =
      1 +
      lineUsed +
      renderText(
        "Billing Address",
        startX,
        BillingAddBoxY,
        BillingAddBoxHeight,
        width,
        page,
        timesRomanFont
      );
    selectedDDValue.billTo.fields.map((item) => {
      lineUsed =
        1 +
        lineUsed +
        renderText(
          item,
          startX,
          BillingAddBoxY - lineUsed * 10,
          BillingAddBoxHeight,
          width,
          page,
          timesRomanFont
        );
    });
    lineUsed += 1;
    selectedDDValue.billAddress.fields.map((item) => {
      lineUsed =
        1 +
        lineUsed +
        renderText(
          item,
          startX,
          BillingAddBoxY - lineUsed * 10,
          BillingAddBoxHeight,
          width,
          page,
          timesRomanFont
        );
    });

    lineUsed += 1;
    lineUsed =
      1 +
      lineUsed +
      renderText(
        `GSTIN: ${selectedDDValue.billAddress.gstIn}`,
        startX,
        BillingAddBoxY - lineUsed * 10,
        BillingAddBoxHeight,
        width,
        page,
        helveticaFont
      );
    lineUsed = 0;
    lineUsed +=
      1 +
      renderText(
        "Shipping Address",
        startX + width + 10,
        BillingAddBoxY - lineUsed * 10,
        BillingAddBoxHeight,
        width,
        page,
        timesRomanFont
      );
    selectedDDValue.shippingAddress.fields.map((item) => {
      lineUsed =
        1 +
        lineUsed +
        renderText(
          item,
          startX + width + 10,
          BillingAddBoxY - lineUsed * 10,
          BillingAddBoxHeight,
          width,
          page,
          timesRomanFont
        );
    });

    //Part 3
    const TableHeightY = startY - height;

    page.drawRectangle({
      x: startX,
      y: TableHeightY,
      width: totalPageWidth - 20,
      height: 40,
      borderColor: rgb(0, 0, 0),
      borderWidth: 1,
      fill: rgb(1, 1, 1),
    });

    let addToX = 0;
    headerList.map((item) => {
      lineUsed += renderText(
        item.label,
        startX + addToX,
        TableHeightY,
        30,
        item.pdfWidth,
        page,
        helveticaFont
      );
      addToX += item.pdfWidth;
    });

    let startListy = TableHeightY;
    selectedItemList.map((item, index) => {
      startListy -= 30;
      page.drawRectangle({
        x: startX,
        y: startListy,
        width: totalPageWidth - 20,
        height: 0,
        borderColor: rgb(0.7, 0.7, 0.7),
        borderWidth: 1,
        fill: rgb(1, 1, 1),
      });

      let addToX = 0;
      Object.keys(item).map((itemx, indexx) => {
        if (itemx != "value") {
          lineUsed += renderText(
            itemx == "gst"
              ? `${item[itemx].label}`
              : (itemx == "discount" ? "-" : "") + `${item[itemx]}`,
            startX + addToX,
            startListy - 10,
            30,
            headerList[indexx].pdfWidth,
            page,
            timesRomanFont
          );
          addToX += headerList[indexx].pdfWidth;
        }
      });
    });

    page.drawRectangle({
      x: startX,
      y: startListy - 30,
      width: totalPageWidth - 20,
      height: 30,
      borderColor: rgb(0, 0, 0),
      borderWidth: 1,
      fill: rgb(1, 1, 1),
    });

    addToX = 0;
    headerList.map((item) => {
      lineUsed += renderText(
        item.keyName == "item" ? "Total:" : `${item.total}`,
        startX + addToX,
        startListy - 35,
        30,
        item.pdfWidth,
        page,
        helveticaFont
      );
      addToX += item.pdfWidth;
    });

    const pdfBytes = await pdfDoc.save();

    const blob = new Blob([pdfBytes], { type: "application/pdf" });
    const url = URL.createObjectURL(blob);
    pdfRef.current.src = url;
  };

  const renderText = (
    textContent,
    startX,
    startY,
    height,
    width,
    page,
    font
  ) => {
    const fontSize = 10;
    const contentX = startX + 5; // Adjust the x-coordinate for text content
    const contentY = startY + height - fontSize - 5; // Adjust the y-coordinate for text content

    // Add text content to the textbox
    const availableWidth = width - 2 * 5; // Calculate available width considering padding on both sides

    const lines = page.drawText(textContent, {
      x: contentX,
      y: contentY,
      size: fontSize,
      maxWidth: availableWidth,
    });

    // Handle text overflow
    if (lines && lines.length > 0 && lines[lines.length - 1].endsWith("...")) {
      // Text overflowed, adjust content and append '...'
      const newTextContent =
        textContent.slice(0, lines.length - 1).trim() + "...";
      page.drawText(newTextContent, {
        x: contentX,
        y: contentY,
        size: fontSize,
        maxWidth: availableWidth,
      });
    }
    return lines ? lines.length : 0;
  };
  const AVERAGE_CHARACTER_WIDTH = 2; // Adjust this value based on your font and size

  const renderCell = (
    startX,
    startY,
    height,
    width,
    lineUsed,
    startTableX,
    startTableY,
    page,
    timesRomanFont,
    helveticaFont,
    text1,
    text2
  ) => {
    const columnWidth = 155;
    const rowHeight = 32;

    page.drawRectangle({
      x: startTableX,
      y: startTableY,
      width: columnWidth,
      height: rowHeight,
      borderColor: rgb(0, 0, 0),
      borderWidth: 1,
      fill: rgb(1, 1, 1),
    });

    lineUsed +=
      1 +
      renderText(
        text1,
        startTableX + 3,
        startTableY + 10,
        rowHeight - 10,
        columnWidth,
        page,
        timesRomanFont
      );

    lineUsed += renderText(
      text2,
      startTableX + 3,
      startTableY + 10 - lineUsed,
      rowHeight - 10,
      columnWidth,
      page,
      timesRomanFont
    );
    return lineUsed;
  };

  useEffect(() => {
    generatePdfStyle2();
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <iframe
        ref={pdfRef}
        title="PDF Viewer"
        width="100%"
        height="100%"
        style={{ border: "none" }}
      />
    </View>
  );
};

export default GeneratePdf;
