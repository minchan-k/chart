import React from 'react';
import * as XLSX from 'xlsx';
import * as XlsxPopulate from 'xlsx-populate/browser/xlsx-populate';

const ExcelExportComponents = ({ data }) => {

    // 다운로드 하기
    const createDownloadData = () => {
        handleExport().then(url => {
            const downloadAnchorNode = document.createElement('a');
            downloadAnchorNode.setAttribute('href', url);
            downloadAnchorNode.setAttribute('download', 'student_details.xlsx');
            downloadAnchorNode.click();
            downloadAnchorNode.remove();
        });
    };

    const s2ab = (s) => {
        const buf = new ArrayBuffer(s.length);

        const view = new Uint8Array(buf);

        for (let i = 0; i !== s.length; ++i) {
            view[i] = s.charCodeAt(i);
        }

        return buf;
    }

    const workbook2blob = (workbook) => {
        const wopts = {
            bookType: 'xlsx',
            type: 'binary'
        }

        const wbout = XLSX.write(workbook, wopts);

        const blob = new Blob([s2ab(wbout)], {
            type: 'application/octet-stream'
        });

        return blob;
    }

    const handleExport = () => {
        const title = [{A: 'Students and Marks Details'}, {}];

        let table1 = [
            {
                A: 'Enrolment No.',
                B: 'Student Name',
                C: 'Parent Name',
                D: 'Class',
                E: 'Subject',
                F: 'Division',
                G: 'Result Status',
            }
        ];

        let table2 = [
            {
                A: 'Enrolment No.',
                B: 'Student Name',
                C: 'Mathematics',
                D: 'Physics',
                E: 'Chemistry',
                F: 'English',
                G: 'Computer Science',
                H: 'Total'
            }
        ];

        data.first.forEach(row => {
            const studentDetails = row.STUDENT_DETAILS;
            const marksDetails = row.MARKS;

            table1.push({
                A: studentDetails.id,
                B: studentDetails.name,
                C: studentDetails.parentName,
                D: studentDetails.classroom,
                E: studentDetails.subject,
                F: studentDetails.division,
                G: studentDetails.status,
            });

            table2.push({
                A: studentDetails.id,
                B: studentDetails.name,
                C: marksDetails.maths,
                D: marksDetails.physics,
                E: marksDetails.chemistry,
                F: marksDetails.english,
                G: marksDetails.computerScience,
                H: marksDetails.maths
                    + marksDetails.physics
                    + marksDetails.chemistry
                    + marksDetails.english
                    + marksDetails.computerScience
            });
        });

        table1 = [{ A: 'Student Details'}]
            .concat(table1)
            .concat([''])
            .concat([{ A: 'Marks'}])
            .concat(table2)

        const finalData = [...title, ...table1];

        // create a workbook
        const wb = XLSX.utils.book_new();

        // create a worksheet
        const sheet1 = XLSX.utils.json_to_sheet(finalData, {
            skipHeader: true,
        });

        const sheet2 =XLSX.utils.json_to_sheet([{}], {
            skipHeader: true,
        });

        XLSX.utils.book_append_sheet(wb, sheet1, 'student_report', true);
        XLSX.utils.book_append_sheet(wb, sheet2, "Sheet2", true);

        const workbookBlob = workbook2blob(wb);

        const headerIndexes = [];
        finalData.forEach((data, index) =>
            data['A'] === 'Enrolment No.' ? headerIndexes.push(index) : null
        );

        const dataInfo = {
            titleCell: 'A2',
            titleRange: 'A1:H2',
            tbodyRange: `A3:H${finalData.length}`,
            theadRange:
                headerIndexes.length >= 1
                    ? `A${headerIndexes[0] + 1}:G${headerIndexes[0] + 1}`
                    : null,
            theadRange1: headerIndexes.length >= 2
                    ? `A${headerIndexes[1] + 1}:H${headerIndexes[1] + 1}`
                    : null,
        }

        return addStyles(workbookBlob, dataInfo);
    };

    const addStyles = (workbookBlob, dataInfo) => {
        return XlsxPopulate.fromDataAsync(workbookBlob)
            .then(workbook => {
                workbook.sheets().forEach((sheet, idx) => {
                    // sheet.usedRange.style({
                    //     fontFamily: 'Arial',
                    //     verticalAlignment: 'center'
                    // });
                    if (idx === 0) {
                        sheet.column('A').width(15);
                        sheet.column('B').width(15);
                        sheet.column('C').width(15);
                        sheet.column('E').width(15);
                        sheet.column('G').width(20);

                        sheet.range(dataInfo.titleRange).merged(true).style({
                            bold: true,
                            bottomBorder: 'double',
                            horizontalAlignment: 'center',
                            verticalAlignment: 'center',
                        })

                        sheet.range(dataInfo.tbodyRange).style({
                            horizontalAlignment: 'center',
                        })

                        sheet.range(dataInfo.theadRange).style({
                            fill: 'FFFD04',
                            bold: true,
                        })

                        sheet.range(dataInfo.theadRange1).style({
                            fill: '808080',
                            bold: true,
                            fontColor: 'ffffff'
                        })
                    }
                    if (idx === 1) {
                        sheet.column('A').width(50);
                        sheet.column('B').width(50);
                    }
                })

                return workbook
                    .outputAsync()
                    .then(workbookBlob => URL.createObjectURL(workbookBlob));
            })
    }

    return <button onClick={() => createDownloadData()}>Export</button>
}

export default ExcelExportComponents;