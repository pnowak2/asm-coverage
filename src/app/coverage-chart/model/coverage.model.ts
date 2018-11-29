export interface CoverageItem {
  label: string;
  periods: Array<CoveragePeriod>;
}

export interface CoveragePeriod {
  label?: string;
  styleClass?: string;
  range?: DateRange;
}

export interface DateRange {
  from?: Date;
  to?: Date;
}

export interface CoveragePeriodEvent {
  domEvent: MouseEvent;
  period: CoveragePeriod;
}

export interface HorizontalAxisLabelVM {
  position: number;
  text: string;
}

export interface CoverageItemVM {
  label: string;
  periods: Array<CoveragePeriodVM>;
}

export interface CoveragePeriodVM {
  label: string;
  styleClass: string;
  width: number;
  offset: number;
  originalPeriod: CoveragePeriod;
}

export interface CoverageVM {
  axisLabels: Array<HorizontalAxisLabelVM>;
  coverageItems: Array<CoverageItemVM>;
}
