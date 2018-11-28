export interface CoverageItem {
  label: string;
  periods: Array<CoveragePeriod>;
}

export interface CoveragePeriod {
  label?: string;
  styleClass?: string;
  from: Date;
  to: Date;
}

export interface TimeWindow {
  from?: Date;
  to?: Date;
}

export interface CoveragePeriodEvent {
  domEvent: MouseEvent;
}

export interface AxisLabelVM {
  percentage: number;
  text: string;
}

export interface CoverageItemVM {
  label: string;
  periods: Array<CoveragePeriodVM>;
}

export interface CoveragePeriodVM {
  label?: string;
  styleClass?: string;
  percentage?: number;
  isEmpty?: boolean;
}
