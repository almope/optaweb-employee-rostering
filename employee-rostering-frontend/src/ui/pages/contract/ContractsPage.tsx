/*
 * Copyright 2019 Red Hat, Inc. and/or its affiliates.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import * as React from 'react';
import {DataTable, DataTableProps, ReadonlyPartial, PropertySetter} from 'ui/components/DataTable';
import {contractOperations} from 'store/contract';
import { AppState } from 'store/types';
import { TextInput, Text } from '@patternfly/react-core';
import { connect } from 'react-redux';
import Contract from 'domain/Contract';
import OptionalInput from 'ui/components/OptionalInput';

interface StateProps extends DataTableProps<Contract> {
  tenantId: number;
}

const mapStateToProps = ({ tenantData, contractList }: AppState): StateProps => ({
  title: "Contracts",
  columnTitles: ["Name", "Max Hours Per Day", "Max Hours Per Week", "Max Hours Per Month", "Max Hours Per Year"],
  tableData: contractList.contractList,
  tenantId: tenantData.currentTenantId
}); 

export interface DispatchProps {
  addContract: typeof contractOperations.addContract;
  updateContract: typeof contractOperations.updateContract;
  removeContract: typeof contractOperations.removeContract;
}

const mapDispatchToProps: DispatchProps = {
  addContract: contractOperations.addContract,
  updateContract: contractOperations.updateContract,
  removeContract: contractOperations.removeContract
};

export type Props = StateProps & DispatchProps;

export class ContractsPage extends DataTable<Contract, Props> {
  constructor(props: Props) {
    super(props);
    this.addData = this.addData.bind(this);
    this.updateData = this.updateData.bind(this);
    this.removeData = this.removeData.bind(this);
  }

  displayDataRow(data: Contract): JSX.Element[] {
    return [
      <Text key={0}>{data.name}</Text>,
      <Text key={1}>{data.maximumMinutesPerDay}</Text>,
      <Text key={2}>{data.maximumMinutesPerWeek}</Text>,
      <Text key={3}>{data.maximumMinutesPerMonth}</Text>,
      <Text key={4}>{data.maximumMinutesPerYear}</Text>
    ];
  }
  
  editDataRow(data: ReadonlyPartial<Contract>, setProperty: PropertySetter<Contract>): JSX.Element[] {
    return [
      <TextInput key={0}
        name="name"
        defaultValue={data.name}
        aria-label="Name"
        onChange={(value) => setProperty("name", value)}
      />,
      <OptionalInput key={1}
        label="Max minutes per day"
        valueToString={value => value.toString()}
        defaultValue={data.maximumMinutesPerDay? data.maximumMinutesPerDay : null}
        onChange={value => setProperty("maximumMinutesPerDay", value)}
        isValid={value => /^\d+$/.test(value)}
        valueMapper={value => parseInt(value)}
      />,
      <OptionalInput key={2}
        label="Max minutes per week"
        valueToString={value => value.toString()}
        defaultValue={data.maximumMinutesPerWeek? data.maximumMinutesPerWeek : null}
        onChange={value => setProperty("maximumMinutesPerWeek", value)}
        isValid={value => /^\d+$/.test(value)}
        valueMapper={value => parseInt(value)}
      />,
      <OptionalInput key={3}
        label="Max minutes per month"
        valueToString={value => value.toString()}
        defaultValue={data.maximumMinutesPerMonth? data.maximumMinutesPerMonth : null}
        onChange={value => setProperty("maximumMinutesPerMonth", value)}
        isValid={value => /^\d+$/.test(value)}
        valueMapper={value => parseInt(value)}
      />,
      <OptionalInput key={4}
        label="Max minutes per year"
        valueToString={value => value.toString()}
        defaultValue={data.maximumMinutesPerYear? data.maximumMinutesPerYear : null}
        onChange={value => setProperty("maximumMinutesPerYear", value)}
        isValid={value => /^\d+$/.test(value)}
        valueMapper={value => parseInt(value)}
      />
    ];
  }
  
  isValid(editedValue: ReadonlyPartial<Contract>): editedValue is Contract {
    return editedValue.name !== undefined &&
      editedValue.maximumMinutesPerDay !== undefined &&
      editedValue.maximumMinutesPerWeek !== undefined &&
      editedValue.maximumMinutesPerMonth !== undefined &&
      editedValue.maximumMinutesPerYear !== undefined &&
      editedValue.name.length > 0;
  }
  
  updateData(data: Contract): void {
    this.props.updateContract(data);
  }
  
  addData(data: Contract): void {
    this.props.addContract(data);
  }

  removeData(data: Contract): void {
    this.props.removeContract(data);
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ContractsPage);