import { DataTable } from './DataTableInterfaces';
import { FilterNullOption, MarkType } from './Namespaces/Tableau';
/**
 * Represents a collection of marks on a viz. This collection could be
 * marks that are either selected or highlighted.
 */
export interface MarksCollection {
    /**
     * @returns  A collection of data tables. Each row in each data table represents a single
     *           mark on the viz. Since marks can contain columns different than the columns of another mark,
     *           for example, a dual axis chart, each table represents one specific schema of a mark.
     */
    readonly data: Array<DataTable>;
}
/**
 * @NotImplemented
 *
 * Represents a mark on in a worksheet.
 */
export interface MarkInfo {
    /**
     * @NotImplemented
     * @returns  The type of this mark.
     */
    readonly type: MarkType;
    /**
     * @NotImplemented
     * @returns  The RGBA value of this mark.
     */
    readonly color: string;
    /**
     * @NotImplemented
     * @returns  Unique tuple representing this mark in a drawn visualization.
     */
    tupleId?: Number;
}
/**
 * SelectionCriteria interface is used to specify to the fieldName to values for Hierarchical, Categorical and Range based selections.
 */
export interface SelectionCriteria {
    /**
     * @hidden
     * tupleIds are of number type.
     */
    readonly tupleId?: Number;
    /**
     * Fieldname of the mark that is intended to be selected.
     * Hierarchical fields follow the convention of "[{parentField}].[{selectingField}]"
     */
    readonly fieldName: string;
    /**
     * Value that is intended to be selected. This can be specified as the list of values or a single value.
     * Range-based selections need to provide the value in the format of RangeValue interface.
     */
    readonly value: CategoricalValue | RangeValue;
}
/**
 * Categorical values for selection.
 */
export declare type CategoricalValue = string | Array<string>;
/**
 * RangeValue interface to provide selection value for range based selections.
 * The associated field should be a quantitative field.
 * For Date Values, UTC Date objects are expected. (i.e., `var min = new Date(Date.UTC(1999, 0, 1))`).
 * While date string inputs work, UTC date inputs are officially supproted going forward for RangeValue.
 */
export interface RangeValue {
    /**
     * min range value for the range based selection
     */
    readonly min: number | Date;
    /**
     * max range value for the range based selection
     */
    readonly max: number | Date;
    /**
     * Including nulloptions parameter.
     */
    readonly nullOption?: FilterNullOption;
}
