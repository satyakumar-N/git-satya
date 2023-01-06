import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';
import Swal from 'sweetalert2';
declare var $: any;
@Injectable({
  providedIn: 'root',
})
export class CommonService {
  isBrowser: any;

  public SDDL = {
    singleSelection: true,
    idField: 'item_id',
    textField: 'item_text',
    enableCheckAll: false,
    itemsShowLimit: 3,
    allowSearchFilter: false,
    closeDropDownOnSelection: true
    // maxHeight: 150
  };

  public Ser_SDDL = {
    enableSearchFilter: true,
    allowSearchFilter: true,
    singleSelection: true,
    enableCheckAll: false,
    classes: "my_dropdown sm_input",
  };

  public Ser_SDDL_Multi = {
    enableSearchFilter: true,
    allowSearchFilter: true,
    singleSelection: false,
    enableCheckAll: false,
    classes: "my_dropdown sm_input",
  };

  startingvalue: any;
  constructor(private toastr: ToastrService,
    private router: Router,
    @Inject(PLATFORM_ID) platformId: string,) {
    this.isBrowser = isPlatformBrowser(platformId);
  }
  public ToastSuccess(msg: any, heading = 'Success') {
    this.toastr.success(msg, heading, {
      enableHtml: true,
      closeButton: true,
    });
  }
  public ToastWarning(msg: any, heading = 'Warning') {
    this.toastr.warning(msg, heading, {
      enableHtml: true,
      closeButton: true,
    });
  }
  public ToastError(msg: any, heading = 'Error') {
    this.toastr.error(msg, heading, {
      enableHtml: true,
      closeButton: true,
    });
  }
  public ToastClear() {
    this.toastr.clear();
  }
  public GotoURL(url: string) {
    this.router.navigate([url]);
  }
  public GotoURLParam(url: string) {
    this.router.navigateByUrl(url);
  }
  public placeholder(object: object, key: any) {
    return Object.assign(object, key);
  }
  public Encrypt(o: any, salt: any) {
    o = JSON.stringify(o).split('');
    for (let i = 0, l = o.length; i < l; i++) {
      if (o[i] === '{') {
        o[i] = '}';
      } else if (o[i] === '}') {
        o[i] = '{';
      }
    }
    return btoa(encodeURI(salt + o.join('')));
  }
  public Decrypt(o: any, salt: any) {
    o = decodeURI(atob(o));
    if (salt && o.indexOf(salt) !== 0) {
      throw new Error('object cannot be decrypted');
    }
    o = o.substring(salt.length).split('');
    for (let i = 0, l = o.length; i < l; i++) {
      if (o[i] === '{') {
        o[i] = '}';
      } else if (o[i] === '}') {
        o[i] = '{';
      }
    }
    return JSON.parse(o.join(''));
  }
  public LocalStorageSet(name: string, data: any) {
    if (this.isBrowser) {
      return localStorage.setItem(
        name,
        this.Encrypt(JSON.stringify(data), name)
      );
    }
  }
  public LocalStorageGet(name: string) {
    if (this.isBrowser) {
      return JSON.parse(this.Decrypt(localStorage.getItem(name), name));
    }
  }
  public SessionStorageSet(name: string, data: any) {
    if (this.isBrowser) {
      return sessionStorage.setItem(
        name,
        this.Encrypt(JSON.stringify(data), name)
      );
    }
  }
  public SessionStorageGet(name: string) {
    if (this.isBrowser) {
      const Data = sessionStorage.getItem(name);
      if (Data && Data !== null) {
        return JSON.parse(this.Decrypt(Data, name));
      }
    }
  }
  public SwalSuccess(msg: string, heading = 'Success!') {
    Swal.fire({
      title: heading,
      text: msg,
      icon: 'success',
      confirmButtonColor: '#7e3f97',
    });
  }
  public SwalWarning(msg: any, heading = 'Warning') {
    Swal.fire(msg, heading, 'warning');
  }
  public SwalError(msg: any, heading = 'Error') {
    Swal.fire(msg, heading, 'error');
  }
  public Swalhtml(Heading: any, msg: any) {
    Swal.fire({
      title: Heading,
      html: msg,
      showCloseButton: false,
      showCancelButton: false,
      focusConfirm: false,
    }).then((result) => {
    });
  }

  public numberOnly(event: any): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }

  public AlphabetsOnly(event: any) {
    const charCode = event.keyCode;
    if (
      (charCode > 64 && charCode < 91) ||
      (charCode > 96 && charCode < 123) ||
      charCode === 8 ||
      charCode === 32
    ) {
      event.target.value = event.target.value.replace(
        /[^A-Za-z0-9-,.;'&/.() ]|^ /g,
        ""
      );
      return true;
    } else {
      return false;
    }
  }

  // ================================================

  public Alpha_No_Without_Space(event: any) {
    if (event.which === 32 && event.target.selectionStart === 0) {
      return false;
    } else {
      const pattern = /^[a-zA-Z0-9]*$/;
      const inputChar = String.fromCharCode(event.charCode);
      if (event.keyCode !== 8 && !pattern.test(inputChar)) {
        event.preventDefault();
      }
    }
  }


  public No_With_dot(event: any) {
    if (event.which === 32 && event.target.selectionStart === 0) {
      return false;
    } else {
      const pattern = /^[0-9.]*$/;
      const inputChar = String.fromCharCode(event.charCode);
      if (event.keyCode !== 8 && !pattern.test(inputChar)) {
        event.preventDefault();
      }
    }
  }

  public NumberOnly(event: any): boolean {
    const charCode = event.which ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }

  public NoSpace(event: any) {
    if (event.keyCode === 32) {
      return false;
    }
  }

  pasteEvent(event, e) {
    setTimeout(() => {
      this.startingvalue = e.target.selectionStart;
    }, 100);

    $('.val').on('input', function () {
      $(this).val($(this).val().toString().replace(/^\s+/, ''));
    });
    ///^[\s\uFEFF\xA0]+/g, ''
    const clipboardData = event.clipboardData;
    const pastedText = clipboardData.getData('text');
    const pattern = /^[a-zA-Z0-9/ ]*$/;
    if (!pattern.test(pastedText)) {
      event.preventDefault();
    }
  }

  pasteEvent_name(event, e) {
    setTimeout(() => {
      this.startingvalue = e.target.selectionStart;
    }, 100);

    $('.val').on('input', function () {
      $(this).val($(this).val().toString().replace(/^\s+/, ''));
    });
    ///^[\s\uFEFF\xA0]+/g, ''
    const clipboardData = event.clipboardData;
    const pastedText = clipboardData.getData('text');
    const pattern = /^[a-zA-Z/]*$/;
    if (!pattern.test(pastedText)) {
      event.preventDefault();
    }
  }

  pasteEvent_no(event, e) {
    setTimeout(() => {
      this.startingvalue = e.target.selectionStart;
    }, 100);

    $('.val').on('input', function () {
      $(this).val($(this).val().toString().replace(/^\s+/, ''));
    });
    ///^[\s\uFEFF\xA0]+/g, ''
    const clipboardData = event.clipboardData;
    const pastedText = clipboardData.getData('text');
    const pattern = /^[0-9./]*$/;
    if (!pattern.test(pastedText)) {
      event.preventDefault();
    }
  }
  // =========================Pste Events===============================
  public PasteEventAlphabets(event) {
    const clipboardData = event.clipboardData;
    const pastedText = clipboardData.getData('text');
    const pattern = /^[a-zA-Z]*$/;
    if (!pattern.test(pastedText)) {
      event.preventDefault();
    }
  }

  public PasteEventNumbers(event) {
    const clipboardData = event.clipboardData;
    const pastedText = clipboardData.getData('text');
    const pattern = /^[0-9.]*$/;
    if (!pattern.test(pastedText)) {
      event.preventDefault();
    }
  }

  public Alphabets_Numbers(event: any) {
    if (event.which === 32 && event.target.selectionStart === 0) {
      return false;
    } else {
      const pattern = /^[a-zA-Z0-9@ ]*$/;
      const inputChar = String.fromCharCode(event.charCode);
      if (event.keyCode !== 8 && !pattern.test(inputChar)) {
        event.preventDefault();
      }
    }
  }

  BindTable(name: any) {
    const t = $(name).DataTable({
      scrollY: "50vh",
      scrollX: true,
      scrollCollapse: true,
      ordering: true,
      // dom: "liBfrtp",
      dom: "liBfrtp",

      lengthMenu: [
        [10, 25, 50, -1],
        ["10", "25", "50", "All"],
      ],
      buttons: [
        // {
        //   extend: "copy",
        //   text: "Copy Data",
        //   title: "",
        // },
        {
          extend: "excelHtml5",
          text: "Download Excel",
          title: "",
        },
        // {
        //   extend: "print",
        //   text: "Print Reports",
        //   title: "",
        // },
      ],
      responsive: true,
      stateSave: true,
      columnDefs: [
        {
          searchable: false,
          orderable: false,
          targets: 0,
        },
      ],
      // order: [[1, "desc"]],
      "order": [[3, "desc"]],
      language: {
        lengthMenu: "show _MENU_ records",
        search: "",
        searchPlaceholder: " Search here..",
      },
    });

    t.on("order.dt search.dt", function () {
      t.column(0, { search: "applied", order: "applied" })
        .nodes()
        .each(function (cell, i) {
          cell.innerHTML = i + 1;
        });
    }).draw();
  }

  public loadRAutocomplete(file: any) {
    const node = document.createElement("script");
    node.src = `${file}`;
    node.type = "text/javascript";
    node.async = true;
    node.defer = true;
    node.charset = "utf-8";
    document.getElementsByTagName("head")[0].appendChild(node);
  }

}
