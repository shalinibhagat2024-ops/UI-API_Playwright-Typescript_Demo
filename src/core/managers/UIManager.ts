import { CalendarComponent } from "@core/helpers/components/CalendarComponent";
import { CardComponent } from "@core/helpers/components/CardComponent";
import { DragDropComponent } from "@core/helpers/components/DragDropComponent";
import { FileUploadComponent } from "@core/helpers/components/FileUploadComponent";
import { GridComponent } from "@core/helpers/components/GridComponent";
import { ModalComponent } from "@core/helpers/components/ModalComponent";
import { PaginationComponent } from "@core/helpers/components/PaginationComponent";
import { ProgressBarComponent } from "@core/helpers/components/ProgressBarComponent";
import { SpinnerComponent } from "@core/helpers/components/SpinnerComponent";
import { TableComponent } from "@core/helpers/components/TableComponent";
import { ToastComponent } from "@core/helpers/components/ToastComponent";
import { Locator, Page } from "@playwright/test";

export class UIManager {
  constructor(private readonly page: Page) {}

  // /**
  //  * Calendar / Date Picker
  //  */
  public calendar(locator: Locator): CalendarComponent {
    return new CalendarComponent(this.page, locator);
  }

  // /**
  //  * File Upload
  //  */
  public upload(locator: Locator): FileUploadComponent {
    return new FileUploadComponent(this.page, locator);
  }

  // /**
  //  * Table
  //  */
  public table(locator: Locator): TableComponent {
    return new TableComponent(this.page, locator);
  }

  // /**
  //  * Grid
  //  */
  public grid(locator: Locator): GridComponent {
    return new GridComponent(this.page, locator);
  }

  // /**
  //  * Pagination
  //  */
  public pagination(locator: Locator): PaginationComponent {
    return new PaginationComponent(this.page, locator);
  }

  // /**
  //  * Modal
  //  */
  public modal(locator: Locator): ModalComponent {
    return new ModalComponent(this.page, locator);
  }

  // /**
  //  * Toast
  //  */
  public toast(locator: Locator): ToastComponent {
    return new ToastComponent(this.page, locator);
  }

  public spinner(locator: Locator): SpinnerComponent {
    return new SpinnerComponent(this.page, locator);
  }

  public progressBar(locator: Locator): ProgressBarComponent {
    return new ProgressBarComponent(this.page, locator);
  }

  /**
   * Drag & Drop
   */
  public dragDrop(locator: Locator): DragDropComponent {
    return new DragDropComponent(this.page, locator);
  }

  /**
   * Card Component
   */
  public card(locator: Locator): CardComponent {
    return new CardComponent(this.page, locator);
  }
}
