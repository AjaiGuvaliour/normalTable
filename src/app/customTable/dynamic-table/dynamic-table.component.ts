import { Component, OnInit, Input, ViewChild, ElementRef, Renderer2 } from '@angular/core';
import * as $ from 'jquery';
@Component({
  selector: 'Jabs-table',
  templateUrl: './dynamic-table.component.html',
  styleUrls: ['./dynamic-table.component.scss']
})
export class DynamicTableComponent implements OnInit {

  @Input() matData = [];
  columns: Array<any> = [];
  tableDatas: Array<any> = [];
  tabledata_cpy: Array<any>= [];
  fiterdata: Array<any>= [];
  searchIndex = 0;
  sortIndex = 0;
  grouping: any="Grouping";
  searchVisible: any = false;
  groupingVisible: any = true;
  sortVisible: any = false;
  sortListing_data: any = {};
  @ViewChild("dynamicSearchOption") dynamicSearchOption: ElementRef;
  @ViewChild("dynamicSortOption") dynamicSortOption: ElementRef;
  constructor(private renderer : Renderer2) { }

  ngOnInit() {
    var objects = this.matData[0];
    console.log(this.matData)
    for (let object in objects) {
      this.columns.push({
        name: object,
        label: "Search by " + object
      });
    }
    this.fiterdata = this.matData;
    this.tabledata_cpy = this.matData;
    this.tableDatas = this.matData.slice(0, 20);
  }

  getIndex(index: any) {
    var mod = index % 26,
      pow = (index / 26) | 0,
      out = mod ? String.fromCharCode(64 + mod) : (--pow, "Z");
    return pow ? this.getIndex(pow) + out : out;
  }

  onScrollDown() {
     let len = this.tableDatas.length;
       for (let i = len; i < len + 5; i++) {
      if (this.tabledata_cpy.length > this.tableDatas.length) {
        this.tableDatas.push(this.tabledata_cpy[i]);
       }
      }
     this.tableDatas = this.tableDatas.slice(0);
  }

  formulaGenerator(event, index) {
    var formula = event.target.value;
    var formulaText = "";
    var valueArray = [];
    var formulaArray = [];
    if (formula.length) {
      for (var i = 0; i < formula.length; i++) {
        formulaText = formulaText + formula[i].replace(/[^A-Za-z0-9]/g, " ");
      }

      formulaArray = formulaText.split(" ");

      for (var j = 0; j < formulaArray.length; j++) {
        if (document.getElementsByClassName(formulaArray[j].toUpperCase())[0]) {
          if (
            document.getElementsByClassName(formulaArray[j].toUpperCase())[0]
              .innerHTML
          ) {
            valueArray[j] = document.getElementsByClassName(
              formulaArray[j].toUpperCase()
            )[0].innerHTML;
          }
        } else {
          valueArray[j] = formulaArray[j];
        }
      }
      for (var k = 0; k < formulaArray.length; k++) {
        formula = formula.replace(formulaArray[k], valueArray[k]);
      }
      var formulatedValue = eval(formula);
      var formulaTextArea = document.getElementById(
        `${"formulaTextArea" + index}`
      );
      formulaTextArea["value"] = formulatedValue;
    }
    if (formula.length == 0) {
      document.getElementById(`${"formulaTextArea" + index}`)["value"] = "";
    }
  }
  //dynamic Search operations

  dynamicSearch() {
    let data = this.tabledata_cpy[0];
    let overall_div = this.renderer.createElement("div");
    let row = this.renderer.createElement("div");
    row.id = "row" + this.searchIndex;
    this.renderer.setAttribute(row, "class", "row1");
    let col1 = this.renderer.createElement("div");
    this.renderer.setAttribute(col1, "class", "column");
    let matform = this.renderer.createElement("mat-form-field");
    let matselect1 = this.renderer.createElement("select");
    this.renderer.setAttribute(matselect1, "class", "select");
    matselect1.placeholder = "please select field to be filter";
    matselect1.id = "selection" + this.searchIndex;
    let option;
    let keys = Object.keys(data);
    keys.unshift("");
    for (var i = 0; i < keys.length; i++) {
      let matoption = this.renderer.createElement("option");
      if (keys[i] == "") {
        option = this.renderer.createText("please select__");
      } else {
        option = this.renderer.createText(keys[i]);
      }
      option.value = data[keys[i]];
      this.renderer.appendChild(matoption, option);
      this.renderer.appendChild(matselect1, matoption);
    }
    this.renderer.listen(matselect1, "change", () => {
      this.selectChange(
        typeof data[matselect1.value],
        document.getElementById(`${matselect1.id}`).parentElement.parentElement
          .nextSibling.firstChild.firstChild
      );
    });
    this.renderer.appendChild(matform, matselect1);
    this.renderer.appendChild(col1, matform);
    let col2 = this.renderer.createElement("div");
    this.renderer.setAttribute(col2, "class", "column");
    let matform2 = this.renderer.createElement("mat-form-field");
    let matselect2 = this.renderer.createElement("select");
    matselect2.id = "type" + this.searchIndex;
    this.renderer.setAttribute(matselect2, "class", "select");
    matselect2.placeholder = "please select Type of search";
    this.renderer.appendChild(matform2, matselect2);
    this.renderer.appendChild(col2, matform2);
    let col3 = this.renderer.createElement("div");
    this.renderer.setAttribute(col3, "class", "column");
    matform = this.renderer.createElement("mat-form-field");
    this.renderer.setAttribute(matform, "class", "example-full-width");
    let input = this.renderer.createElement("input");
    input.id = "searched" + this.searchIndex;
    this.renderer.setAttribute(input, "matInput", "");
    this.renderer.appendChild(matform, input);
    this.renderer.appendChild(col3, matform);
    let button = this.renderer.createElement("input");
    button.type = "submit";
    this.renderer.setAttribute(
      button,
      "class",
      "button_add column_delete mat-button-try btn btn-light"
    );
    this.renderer.setAttribute(button, "value", "-");
    this.renderer.listen(button, "click", () => {
      this.deleteDom(this.dynamicSearchOption.nativeElement, row.id);
    });
    this.renderer.appendChild(row, col1);
    this.renderer.appendChild(row, col2);
    this.renderer.appendChild(row, col3);
    this.renderer.appendChild(row, button);
    let padding = this.renderer.createElement("div");
    this.renderer.setAttribute(padding, "class", "padding_20");
    this.renderer.appendChild(overall_div, row);
    this.renderer.appendChild(overall_div, padding);
    this.renderer.appendChild(
      this.dynamicSearchOption.nativeElement,
      overall_div
    );
    this.searchIndex++;
  }

  selectChange(type: any, childElement: any) {
    var select_element = document.getElementById(`${childElement.id}`);
    var date_type = [" ", "Before", "After"];
    var string_type = [" ", "Contains", "Start With", "Ends With", "Equals"];
    var number_type = [" ", "<", ">", "<=", ">=", "==", "!="];
    var boolean_type = ["", "true", "false"];
    var option;
    switch (type) {
      case "string":
        while (select_element.firstChild)
          select_element.removeChild(select_element.firstChild);
        for (var i = 0; i < string_type.length; i++) {
          option = document.createElement("option");
          option.value = string_type[i];
          string_type[i] == " "
            ? (option.text = "please select___")
            : (option.text = string_type[i]);
          select_element.appendChild(option);
        }
        break;
      case "boolean":
        while (select_element.firstChild)
          select_element.removeChild(select_element.firstChild);
        for (var i = 0; i < boolean_type.length; i++) {
          option = document.createElement("option");
          option.value = boolean_type[i];
          boolean_type[i] == ""
            ? (option.text = "please select___")
            : (option.text = boolean_type[i]);
          select_element.appendChild(option);
        }
        break;
      case "number":
        while (select_element.firstChild)
          select_element.removeChild(select_element.firstChild);
        for (var i = 0; i < number_type.length; i++) {
          option = document.createElement("option");
          option.value = number_type[i];
          number_type[i] == " "
            ? (option.text = "please select___")
            : (option.text = number_type[i]);
          select_element.appendChild(option);
        }
        break;
      case "date":
        while (select_element.firstChild)
          select_element.removeChild(select_element.firstChild);
        for (var i = 0; i < date_type.length; i++) {
          option = document.createElement("option");
          option.value = date_type[i];
          date_type[i] == " "
            ? (option.text = "please select___")
            : (option.text = date_type[i]);
          select_element.appendChild(option);
        }
        break;
      default:
        break;
    }
  }

  filterData(searching_list: any) {
    let fields = this.fiterdata[0],
      items = this.fiterdata;
    if (items.length && items) {
      var filldata = items.filter(item => {
        for (let prop in fields) {
          for (var i = 0; i < searching_list.length; i++) {
            if (
              searching_list[i]["types"] == "Contains" ||
              searching_list[i]["types"] == " "
            ) {
              if (
                searching_list[i][prop] &&
                item[prop]
                  .toLowerCase()
                  .indexOf(searching_list[i][prop].toLowerCase()) === -1
              ) {
                return false;
              }
            } else if (searching_list[i]["types"] == "Ends With") {
              if (
                searching_list[i][prop] &&
                item[prop]
                  .toLowerCase()
                  .endsWith(searching_list[i][prop].toLowerCase()) - 1
              ) {
                return false;
              }
            } else if (searching_list[i]["types"] == "Start With") {
              if (
                searching_list[i][prop] &&
                item[prop]
                  .toLowerCase()
                  .startsWith(searching_list[i][prop].toLowerCase()) - 1
              ) {
                return false;
              }
            } else if (searching_list[i]["types"] == "Equals") {
              if (
                searching_list[i][prop] &&
                item[prop].toLowerCase() !==
                  searching_list[i][prop].toLowerCase()
              ) {
                return false;
              }
            } else if (searching_list[i]["types"] == "<") {
              if (
                searching_list[i][prop] &&
                searching_list[i][prop] - 1 < item[prop]
              ) {
                return false;
              }
            } else if (searching_list[i]["types"] == ">") {
              if (
                searching_list[i][prop] &&
                parseInt(searching_list[i][prop]) + 1 > item[prop]
              ) {
                return false;
              }
            } else if (searching_list[i]["types"] == "<=") {
              if (
                searching_list[i][prop] &&
                parseInt(searching_list[i][prop]) < item[prop]
              ) {
                return false;
              }
            } else if (searching_list[i]["types"] == ">=") {
              if (
                searching_list[i][prop] &&
                parseInt(searching_list[i][prop]) > item[prop]
              ) {
                return false;
              }
            } else if (searching_list[i]["types"] == "==") {
              if (
                searching_list[i][prop] &&
                parseInt(searching_list[i][prop]) != item[prop]
              ) {
                return false;
              }
            } else if (searching_list[i]["types"] == "!=") {
              if (
                searching_list[i][prop] &&
                parseInt(searching_list[i][prop]) == item[prop]
              ) {
                return false;
              }
            }
          }
        }
        return true;
      });
    }
    this.tabledata_cpy = filldata;
    this.tableDatas = filldata.slice(0, 20);
  }


  //dynamic sorting

  dynamicSort() {
    let data = this.tabledata_cpy[0];
    let overall_div = this.renderer.createElement("div");
    let row = this.renderer.createElement("div");
    row.id = "rowSort" + this.sortIndex;
    this.renderer.setAttribute(row, "class", "row1 sortClass");
    let col1 = this.renderer.createElement("div");
    this.renderer.setAttribute(col1, "class", "column_sort");
    let matform = this.renderer.createElement("mat-form-field");
    let matselect1 = this.renderer.createElement("select");
    this.renderer.setAttribute(matselect1, "class", "select");
    matselect1.placeholder = "please select field to be filter";
    matselect1.id = "selectionSort" + this.sortIndex;
    let option;
    let keys = Object.keys(data);
    keys.unshift("");
    for (var i = 0; i < keys.length; i++) {
      let matoption = this.renderer.createElement("option");
      if (keys[i] == "") {
        option = this.renderer.createText("please select__");
      } else {
        option = this.renderer.createText(keys[i]);
      }
      option.value = data[keys[i]];
      this.renderer.appendChild(matoption, option);
      this.renderer.appendChild(matselect1, matoption);
    }
    this.renderer.appendChild(matform, matselect1);
    this.renderer.appendChild(col1, matform);
    let col2 = this.renderer.createElement("div");
    this.renderer.setAttribute(col2, "class", "column_sort");
    let matform2 = this.renderer.createElement("mat-form-field");
    let matselect2 = this.renderer.createElement("select");
    matselect2.id = "typeSort" + this.sortIndex;
    this.renderer.setAttribute(matselect2, "class", "select");
    matselect2.placeholder = "please select Type of search";
    var keyValue = [" ", "desc", "asc"];
    for (var i = 0; i < keyValue.length; i++) {
      let matoption = this.renderer.createElement("option");
      if (keyValue[i] == " ") {
        option = this.renderer.createText("please select__");
      } else {
        option = this.renderer.createText(keyValue[i]);
      }
      option.value = data[keyValue[i]];
      this.renderer.appendChild(matoption, option);
      this.renderer.appendChild(matselect2, matoption);
    }
    this.renderer.appendChild(matform2, matselect2);
    this.renderer.appendChild(col2, matform2);
    let button = this.renderer.createElement("input");
    button.type = "submit";
    this.renderer.setAttribute(
      button,
      "class",
      "button_add column_delete mat-button-try btn btn-light"
    );
    this.renderer.setAttribute(button, "value", "-");
    this.renderer.listen(button, "click", () => {
      this.deleteDom(this.dynamicSearchOption.nativeElement, row.id);
    });
    this.renderer.appendChild(row, col1);
    this.renderer.appendChild(row, col2);
    this.renderer.appendChild(row, button);
    let padding = this.renderer.createElement("div");
    this.renderer.setAttribute(padding, "class", "padding_20");
    this.renderer.appendChild(overall_div, row);
    this.renderer.appendChild(overall_div, padding);
    this.renderer.appendChild(
      this.dynamicSortOption.nativeElement,
      overall_div
    );
    this.sortIndex++;
  }

  
  find(event: any) {
    var find = event.id;
    if (find == "findSearch") {
      let searching_list = [];
      for (var i = 0; i < this.searchIndex; i++) {
        var element = {},
          type,
          selection,
          searched;
        if (document.getElementById(`${"type" + i}`)) {
          type = document.getElementById(`${"type" + i}`)["value"];
        } else {
          type = "";
        }
        if (document.getElementById(`${"selection" + i}`)) {
          selection = document.getElementById(`${"selection" + i}`)["value"];
        } else {
          selection = "";
        }
        if (document.getElementById(`${"searched" + i}`)) {
          searched = document.getElementById(`${"searched" + i}`)["value"];
        } else {
          searched = "";
        }
        if (selection != "") {
          element[selection] = searched;
          element["types"] = type;
          searching_list.push(element);
        }
      }
      this.filterData(searching_list);
    } else if (find == "findSort") {
      let sort_List = {};
      for (var i = 0; i < this.sortIndex; i++) {
        var key_id, value_id, key, value;
        if (document.getElementsByClassName("sortClass")[i]) {
          key_id = document.getElementsByClassName("sortClass")[i].childNodes[0].lastChild.lastChild;
          value_id = document.getElementsByClassName("sortClass")[i].childNodes[1].lastChild.lastChild;
          key = document.getElementById(key_id.id);
          value = document.getElementById(value_id.id);
          sort_List[key.value] = value.value;
        }
      }
      this.orderBy(sort_List);
      this.sortListing_data = sort_List;
    }
  }


  refresh(event: any) {
    console.log(event)
    var refresh = event.id;
    if (refresh == "resetSearch") {
      this.filterData("");
      for (var i = 0; i < this.searchIndex; i++) {
        if (document.getElementById("row" + i)) {
          let selectedrow = document.getElementById("row" + i).parentElement;
          this.renderer.removeChild(
            this.dynamicSearchOption.nativeElement,
            selectedrow
          );
        }
      }
      this.searchIndex = 0;
      this.orderBy(this.sortListing_data);
    } else if (refresh == "resetSort") {
      for (var i = 0; i < this.sortIndex; i++) {
        if (document.getElementById("rowSort" + i)) {
          let selectedrow = document.getElementById("rowSort" + i)
            .parentElement;
          this.renderer.removeChild(
            this.dynamicSortOption.nativeElement,
            selectedrow
          );
        }
      }
      this.sortIndex = 0;
     this.orderBy({});
      this.sortListing_data = {};
    }
  }

  deleteDom(nativeElement: any, delete_row: any) {
    let selectedrow = document.getElementById(`${delete_row}`).parentElement;
    this.renderer.removeChild(nativeElement, selectedrow);
  }



  orderBy(sortData: any) {
    var obja = this.tabledata_cpy.slice(0);
    var sorto = sortData;
    Array.prototype["keySort"] = function(keys) {
      keys = keys || {};
      var obLen = function(obj) {
        var size = 0,
          key;
        for (key in obj) {
          if (obj.hasOwnProperty(key)) size++;
        }
        return size;
      };
      var obIx = function(obj, ix) {
        var size = 0,
          key;
        for (key in obj) {
          if (obj.hasOwnProperty(key)) {
            if (size == ix) return key;
            size++;
          }
        }
        return false;
      };
      var keySort = function(a, b, d) {
        d = d !== null ? d : 1;
        if (a == b) return 0;
        return a > b ? 1 * d : -1 * d;
      };
      var KL = obLen(keys);
      if (!KL) return this.sort(keySort);
      for (var k in keys) {
        keys[k] =
          keys[k] == "desc" || keys[k] == -1
            ? -1
            : keys[k] == "skip" || keys[k] === 0
            ? 0
            : 1;
      }
      this.sort(function(a, b) {
        var sorted = 0,
          ix = 0;
        while (sorted === 0 && ix < KL) {
          var k = obIx(keys, ix);
          if (k) {
            var dir = keys[k];
            sorted = keySort(a[k], b[k], dir);
            ix++;
          }
        }
        return sorted;
      });
      return this;
    };
    obja["keySort"](sorto);
    this.tableDatas = obja;
  }
  groupBy() {
    this.groupingVisible = ! this.groupingVisible;

    var to = Object.keys(this.matData[0]);
    function groupTable($rows, startIndex, total) {
      if (total === 0) {
        return;
      }
      var i,
        currentIndex = startIndex,
        count = 1,
        lst = [];
      var tds = $rows.find("td:eq(" + currentIndex + ")");
      var ctrl = $(tds[0]);
      lst.push($rows[0]);
      for (i = 1; i <= tds.length; i++) {
        if (ctrl.text() == $(tds[i]).text()) {
          count++;
          $(tds[i]).addClass("deleted");
          lst.push($rows[i]);
        } else {
          if (count > 1) {
            ctrl.attr("rowspan", count);
            groupTable($(lst), startIndex + 1, total - 1);
          }
          count = 1;
          lst = [];
          ctrl = $(tds[i]);
          lst.push($rows[i]);
        }
      }
    }

    if (!this.groupingVisible) {
      this.grouping="UnGroup";
      groupTable($("#datatable tr:has(td)"), 1, to.length);
      $("#datatable .deleted").hide();
    }
    else{
        this.grouping="Grouping";
        $("#datatable .deleted").show();
        $("#datatable tbody tr td").removeAttr("rowspan");
    }

  }

  isSticky(){
    var bb=['USER','TIME'];

    for(var j=0;j<bb.length;j++){

    for(var i =0; i< document.getElementsByClassName(bb[j]).length;i++){
        this.renderer.addClass(document.getElementsByClassName(bb[j])[i],'staticArea');
       this.renderer.setStyle(document.getElementsByClassName(bb[j])[i],'left',document.getElementsByClassName(bb[j])[0]["offsetLeft"]+'px');
        //this.renderer.removeStyle(document.getElementsByClassName(bb[j])[i],'left')
   }
  }
  }

  
}
