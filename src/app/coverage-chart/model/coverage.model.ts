export interface CoverageItem {
  label: string;
  periods: Array<CoveragePeriod>;
}

export interface CoveragePeriod {
  label: string;
  styleClass: string;
  from: Date;
  to: Date;
}

export interface TimeWindow {
  from: Date;
  to: Date;
}
