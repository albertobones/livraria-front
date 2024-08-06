import { Component, OnInit, ViewChild } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { NgxSmartModalService } from 'ngx-smart-modal';
import { MatTableDataSource } from "@angular/material/table";
import { MatSort } from "@angular/material/sort";
import { RelatorioService } from "../relatorio.service";

@Component({
  selector: "app-relatorio",
  templateUrl: "./relatorio.component.html",
  styleUrls: ["./relatorio.component.css"]

})
export class RelatorioComponent {
  constructor(private relatorioService: RelatorioService) { }

  generateReport(reportType: string) {
    this.relatorioService.generateReport().subscribe(response => {
      const url = window.URL.createObjectURL(response);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${reportType}.pdf`;
      a.click();
      window.URL.revokeObjectURL(url);
    });
  }
}
