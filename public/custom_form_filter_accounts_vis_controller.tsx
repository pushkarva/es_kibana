/*
 * Licensed to Elasticsearch B.V. under one or more contributor
 * license agreements. See the NOTICE file distributed with
 * this work for additional information regarding copyright
 * ownership. Elasticsearch B.V. licenses this file to you under
 * the Apache License, Version 2.0 (the "License"); you may
 * not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

import React from 'react';
import {
  EuiButton,
  EuiForm,
  EuiFormRow,
  EuiFieldText,
  EuiSpacer,
  EuiText,
  EuiComboBox,
  EuiFlexGroup,
  EuiFlexItem
} from '@elastic/eui';
import { useKibana } from '../../../src/plugins/kibana_react/public';
import { CustomFormFilterAccountsVisDependencies } from './plugin';
import { CustomFormFilterAccountsVisParams } from './types';
import { removeFiltersByControlledBy, stringToInt, stringToFloat } from './filter_helper';
import { fetchData } from './fetch_data';

const filterControlledBy = 'accountsVis';

interface CustomFormFilterAccountsVisComponentProps extends CustomFormFilterAccountsVisParams {
  renderComplete: () => {};
}

interface RxClaimsForm {
  cvs_claim_nbr: string,
  business_ln: string,
  file_id: string,
  ndc_cd: string,
  drug_label: string,
  rx_member_id: string,
  rptng_mbr_id: string,
  nabp_nbr: string,
  prescriber_npi: string,
  group_nbr: string
}

/**
 * The CustomFormFilterAccountsVisComponent renders the form.
 */
class CustomFormFilterAccountsVisComponent extends React.Component<CustomFormFilterAccountsVisComponentProps> {

  asyncInitStated: boolean = false;
  isLoading: boolean = true;
  rx_claim: RxClaimsForm;

  /**
   * Will be called after the first render when the component is present in the DOM.
   *
   * We call renderComplete here, to signal, that we are done with rendering.
   */
  componentDidMount() {
    this.props.renderComplete();
  }

  /**
   * Will be called after the component has been updated and the changes has been
   * flushed into the DOM.
   *
   * We will use this to signal that we are done rendering by calling the
   * renderComplete property.
   */
  componentDidUpdate() {
    this.props.renderComplete();
  }

  constructor(props: CustomFormFilterAccountsVisComponentProps) {
    super(props);

    removeFiltersByControlledBy(this.props.filterManager, filterControlledBy);

    if (props.cvs_claim_nbr != null)
      this.rx_claim.cvs_claim_nbr = String(props.cvs_claim_nbr);
    if (props.business_ln != null)
      this.rx_claim.business_ln = String(props.business_ln);
    if (props.file_id != null)
      this.rx_claim.file_id = String(props.file_id);
    if (props.ndc_cd != null)
      this.rx_claim.ndc_cd = String(props.ndc_cd);
    if (props.drug_label != null)
      this.rx_claim.drug_label = String(props.drug_label);
    if (props.rx_member_id != null)
      this.rx_claim.rx_member_id = String(props.rx_member_id);
    if (props.rptng_mbr_id != null)
      this.rx_claim.rptng_mbr_id = String(props.rptng_mbr_id);
    if (props.nabp_nbr != null)
      this.rx_claim.nabp_nbr = String(props.nabp_nbr);
    if (props.prescriber_npi != null)
      this.rx_claim.prescriber_npi = String(props.prescriber_npi);
    if (props.group_nbr != null)
      this.rx_claim.group_nbr = String(props.group_nbr);
  }



  onClickButtonApplyFilter = () => {
    removeFiltersByControlledBy(this.props.filterManager, filterControlledBy);

    const cvs_claim_nbr = this.rx_claim.cvs_claim_nbr;
    if (cvs_claim_nbr != null) {
      const cvs_claim_nbr_filter = {
        meta: {
          controlledBy: filterControlledBy,
          alias: 'CVS Claim Number: ' + cvs_claim_nbr,
          disabled: false,
          negate: false,
        },
        query: {
          match_phrase: {
            cvs_claim_nbr: cvs_claim_nbr
          }
        }
      };
      this.props.filterManager.addFilters(cvs_claim_nbr_filter);
    }

    const business_ln = this.rx_claim.business_ln;
    if (business_ln != null) {
      const business_ln_filter = {
        meta: {
          controlledBy: filterControlledBy,
          alias: 'Business line: ' + business_ln,
          disabled: false,
          negate: false,
        },
        query: {
          match_phrase: {
            business_ln: business_ln
          }
        }
      };
      this.props.filterManager.addFilters(business_ln_filter);
    }

    const file_id = this.rx_claim.file_id;
    if (file_id != null) {
      const file_id_filter = {
        meta: {
          controlledBy: filterControlledBy,
          alias: 'file id: ' + file_id,
          disabled: false,
          negate: false,
        },
        query: {
          match_phrase: {
            file_id: file_id
          }
        }
      };
      this.props.filterManager.addFilters(file_id_filter);
    }


    const ndc_cd = this.rx_claim.ndc_cd;
    if (ndc_cd != null) {
      const ndc_cd_filter = {
        meta: {
          controlledBy: filterControlledBy,
          alias: 'ndc code: ' + ndc_cd,
          disabled: false,
          negate: false,
        },
        query: {
          match_phrase: {
            ndc_cd: ndc_cd
          }
        }
      };
      this.props.filterManager.addFilters(ndc_cd_filter);
    }


    const drug_label = this.rx_claim.drug_label;
    if (drug_label != null) {
      const drug_label_filter = {
        meta: {
          controlledBy: filterControlledBy,
          alias: 'drug label: ' + drug_label,
          disabled: false,
          negate: false,
        },
        query: {
          match_phrase: {
            drug_label: drug_label
          }
        }
      };
      this.props.filterManager.addFilters(drug_label_filter);
    }


    const rx_member_id = this.rx_claim.rx_member_id;
    if (rx_member_id != null) {
      const rx_member_id_filter = {
        meta: {
          controlledBy: filterControlledBy,
          alias: 'rx member id: ' + rx_member_id,
          disabled: false,
          negate: false,
        },
        query: {
          match_phrase: {
            rx_member_id: rx_member_id
          }
        }
      };
      this.props.filterManager.addFilters(rx_member_id_filter);
    }


    const rptng_mbr_id = this.rx_claim.rptng_mbr_id;
    if (rptng_mbr_id != null) {
      const rptng_mbr_id_filter = {
        meta: {
          controlledBy: filterControlledBy,
          alias: 'Reporting member id: ' + rptng_mbr_id,
          disabled: false,
          negate: false,
        },
        query: {
          match_phrase: {
            rptng_mbr_id: rptng_mbr_id
          }
        }
      };
      this.props.filterManager.addFilters(rptng_mbr_id_filter);
    }

    const nabp_nbr = this.rx_claim.nabp_nbr;
    if (nabp_nbr != null) {
      const nabp_nbr_filter = {
        meta: {
          controlledBy: filterControlledBy,
          alias: 'nabp number: ' + nabp_nbr,
          disabled: false,
          negate: false,
        },
        query: {
          match_phrase: {
            nabp_nbr: nabp_nbr
          }
        }
      };
      this.props.filterManager.addFilters(nabp_nbr_filter);
    }

    const prescriber_npi = this.rx_claim.prescriber_npi;
    if (prescriber_npi != null) {
      const prescriber_npi_filter = {
        meta: {
          controlledBy: filterControlledBy,
          alias: 'prescriber npi: ' + prescriber_npi,
          disabled: false,
          negate: false,
        },
        query: {
          match_phrase: {
            prescriber_npi: prescriber_npi
          }
        }
      };
      this.props.filterManager.addFilters(prescriber_npi_filter);
    }

    const group_nbr = this.rx_claim.group_nbr;
    if (group_nbr != null) {
      const group_nbr_filter = {
        meta: {
          controlledBy: filterControlledBy,
          alias: 'group number: ' + group_nbr,
          disabled: false,
          negate: false,
        },
        query: {
          match_phrase: {
            group_nbr: group_nbr
          }
        }
      };
      this.props.filterManager.addFilters(group_nbr_filter);
    }

  }

  onClickButtonDeleteFilter = () => {
    removeFiltersByControlledBy(this.props.filterManager, filterControlledBy);
  };

  onClickButtonClearForm = () => {
    this.rx_claim.cvs_claim_nbr = "";
    this.rx_claim.business_ln = "";
    this.rx_claim.file_id = "";
    this.rx_claim.ndc_cd = "";
    this.rx_claim.drug_label = "";
    this.rx_claim.rx_member_id = "";
    this.rx_claim.rptng_mbr_id = "";
    this.rx_claim.nabp_nbr = "";
    this.rx_claim.prescriber_npi = "";
    this.rx_claim.group_nbr = "";


    removeFiltersByControlledBy(this.props.filterManager, filterControlledBy);
    this.forceUpdate();
  };

  onClickButtonToday = () => {
    this.props.timefilter.setTime(
      { from: 'now/d', to: 'now/d' }
    );
  };

  onFormChange = (event) => {
    const target = event.target;
    const valueStr = target.value;
    const name = target.name;
    //there is no validation in this sample code to prevent illegal typing
    this.setState({
      [name]: valueStr
    });
  };

  onCountryStateChange = selectedOptions => {
    this.setState({
      ["countryStateSelected"]: selectedOptions
    });
  };

  /**
   * Render the actual HTML.
   */
  render() {
    // this.initControls();
    // const minimumBalanceHelpText = `Input account minimum balance (Maximum is ${this.props.maximumBalance})`;
    return (
      <div className="cffVis" >
        <EuiForm>
          <EuiFlexGroup style={{ maxWidth: 600 }}>

            <EuiFlexItem grow={false} style={{ width: 100 }}>
              <EuiFormRow label="CVS Claim #">
                <EuiFieldText name="cvs_claim_nbr" onChange={e => this.onFormChange(e)} value={this.rx_claim.cvs_claim_nbr} />
              </EuiFormRow>
            </EuiFlexItem>

            <EuiFlexItem grow={false} style={{ width: 100 }}>
              <EuiFormRow label="Business Line">
                <EuiFieldText name="business_ln" onChange={e => this.onFormChange(e)} value={this.rx_claim.business_ln} />
              </EuiFormRow>
            </EuiFlexItem>

            <EuiFlexItem grow={false} style={{ width: 100 }}>
              <EuiFormRow label="File ID">
                <EuiFieldText name="file_id" onChange={e => this.onFormChange(e)} value={this.rx_claim.file_id} />
              </EuiFormRow>
            </EuiFlexItem>

            <EuiFlexItem grow={false} style={{ width: 100 }}>
              <EuiFormRow label="NDC Code">
                <EuiFieldText name="ndc_cd" onChange={e => this.onFormChange(e)} value={this.rx_claim.ndc_cd} />
              </EuiFormRow>
            </EuiFlexItem>

            <EuiFlexItem grow={false} style={{ width: 100 }}>
              <EuiFormRow label="Drug Label">
                <EuiFieldText name="drug_label" onChange={e => this.onFormChange(e)} value={this.rx_claim.drug_label} />
              </EuiFormRow>
            </EuiFlexItem>

          </EuiFlexGroup>

          <EuiSpacer />

          <EuiFlexGroup style={{ maxWidth: 600 }}>

            <EuiFlexItem grow={false} style={{ width: 100 }}>
              <EuiFormRow label="Reporting Member ID">
                <EuiFieldText name="rptng_mbr_id" onChange={e => this.onFormChange(e)} value={this.rx_claim.rptng_mbr_id} />
              </EuiFormRow>
            </EuiFlexItem>

            <EuiFlexItem grow={false} style={{ width: 100 }}>
              <EuiFormRow label="RX Member ID">
                <EuiFieldText name="rx_member_id" onChange={e => this.onFormChange(e)} value={this.rx_claim.rx_member_id} />
              </EuiFormRow>
            </EuiFlexItem>

            <EuiFlexItem grow={false} style={{ width: 100 }}>
              <EuiFormRow label="Pharmacy NABP #">
                <EuiFieldText name="nabp_nbr" onChange={e => this.onFormChange(e)} value={this.rx_claim.nabp_nbr} />
              </EuiFormRow>
            </EuiFlexItem>

            <EuiFlexItem grow={false} style={{ width: 100 }}>
              <EuiFormRow label="Prescriber NPI">
                <EuiFieldText name="prescriber_npi" onChange={e => this.onFormChange(e)} value={this.rx_claim.prescriber_npi} />
              </EuiFormRow>
            </EuiFlexItem>

            <EuiFlexItem grow={false} style={{ width: 100 }}>
              <EuiFormRow label="Group #">
                <EuiFieldText name="group_nbr" onChange={e => this.onFormChange(e)} value={this.rx_claim.group_nbr} />
              </EuiFormRow>
            </EuiFlexItem>
            
          </EuiFlexGroup>


          <EuiSpacer />
          <EuiButton onClick={this.onClickButtonApplyFilter} fill>Apply filter</EuiButton>&nbsp;
          <EuiButton onClick={this.onClickButtonDeleteFilter} >Delete filter</EuiButton>&nbsp;
          <EuiButton onClick={this.onClickButtonClearForm} >Clear form</EuiButton>&nbsp;
          <EuiButton onClick={this.onClickButtonToday} color="secondary">Time: today</EuiButton>
        </EuiForm>
      </div>
    );
  }
}

/**
 * This is a wrapper component, that is actually used as the visualization.
 * The sole purpose of this component is to extract all required parameters from
 * the properties and pass them down as separate properties to the actual component.
 * That way the actual (CustomFormFilterAccountsVisComponent) will properly trigger it's prop update
 * callback (componentWillReceiveProps) if one of these params change. It wouldn't
 * trigger otherwise (e.g. it doesn't for this wrapper), since it only triggers
 * if the reference to the prop changes (in this case the reference to vis).
 *
 * The way React works, this wrapper nearly brings no overhead, but allows us
 * to use proper lifecycle methods in the actual component.
 */
import { CustomFormFilterAccountsVisComponentProp } from './custom_form_filter_accounts_vis';

export function CustomFormFilterAccountsVisWrapper(props: CustomFormFilterAccountsVisComponentProp) {
  const kibana = useKibana<CustomFormFilterAccountsVisDependencies>();
  return (
    <CustomFormFilterAccountsVisComponent
      filterCounter={props.visParams.filterCounter}
      cvs_claim_nbr={props.visParams.cvs_claim_nbr}
      business_ln={props.visParams.business_ln}
      file_id={props.visParams.file_id}
      ndc_cd={props.visParams.ndc_cd}
      drug_label={props.visParams.drug_label}
      rx_member_id={props.visParams.rx_member_id}
      rptng_mbr_id={props.visParams.rptng_mbr_id}
      nabp_nbr={props.visParams.nabp_nbr}
      prescriber_npi={props.visParams.prescriber_npi}
      group_nbr={props.visParams.group_nbr}
      renderComplete={props.renderComplete}
      timefilter={kibana.services.timefilter}
      filterManager={kibana.services.filterManager}
      coreSetup={kibana.services.coreSetup}
    />
  );
}
