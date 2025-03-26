import { ConditionEndType, ConditionType } from '../../../enums/condition-type';
import { Segmented, Space } from 'antd';
import { Condition } from '../../../models/condition';
import { ConditionLogic } from '../../../logic/condition-logic';
import { DangerButton } from '../../controls/danger-button/danger-button';
import { Field } from '../../controls/field/field';
import { Markdown } from '../../controls/markdown/markdown';
import { MultiLine } from '../../controls/multi-line/multi-line';
import { Utils } from '../../../utils/utils';
import { useState } from 'react';

import './condition-panel.scss';

interface Props {
	condition: Condition;
	onChange: (condition: Condition) => void;
	onDelete: (condition: Condition) => void;
}

export const ConditionPanel = (props: Props) => {
	const [ condition, setCondition ] = useState<Condition>(Utils.copy(props.condition));

	const setConditionText = (value: string) => {
		if (props.onChange) {
			const copy = Utils.copy(condition);
			copy.text = value;
			setCondition(copy);
			props.onChange(copy);
		}
	};

	const setConditionEndType = (value: ConditionEndType) => {
		if (props.onChange) {
			const copy = Utils.copy(condition);
			copy.ends = value;
			setCondition(copy);
			props.onChange(copy);
		}
	};

	try {
		return (
			<div className='condition-panel'>
				<Space direction='vertical' style={{ width: '100%', margin: '5px 0' }}>
					{
						condition.type === ConditionType.Custom ?
							<MultiLine label='Custom Condition Text' value={condition.text} onChange={setConditionText} />
							:
							<Field
								label={condition.type}
								value={
									<Markdown
										text={ConditionLogic.getDescription(condition.type)}
										useSpan={true}
									/>
								}
							/>
					}
					<Segmented
						name='endtypes'
						block={true}
						options={[ ConditionEndType.EndOfTurn, ConditionEndType.SaveEnds ]}
						value={condition.ends}
						onChange={setConditionEndType}
					/>
				</Space>
				<div className='action-buttons'>
					<DangerButton mode='clear' onConfirm={() => props.onDelete(condition)} />
				</div>
			</div>
		);
	} catch (ex) {
		console.error(ex);
		return null;
	}
};
