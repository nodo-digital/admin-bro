import React from 'react'
import { TableCaption, Button, Icon, CardTitle } from '@admin-bro/design-system'

import { RecordJSON, ResourceJSON } from '../../../interfaces'
import ActionButton from '../action-button/action-button'
import getBulkActionsFromRecords from './utils/get-bulk-actions-from-records'
import { useTranslation } from '../../../hooks'

type SelectedRecordsProps = {
  resource: ResourceJSON;
  selectedRecords?: Array<RecordJSON>;
}

export const SelectedRecords: React.FC<SelectedRecordsProps> = (props) => {
  const { resource, selectedRecords } = props
  const { translateLabel } = useTranslation()

  if (!selectedRecords || !selectedRecords.length) {
    return null
  }

  const bulkActions = getBulkActionsFromRecords(selectedRecords)

  return (
    <TableCaption>
      <CardTitle as="span" mr="lg">
        {translateLabel('selectedRecords', resource.id, { selected: selectedRecords.length })}
      </CardTitle>
      {bulkActions.map(action => (
        <ActionButton
          action={action}
          key={action.name}
          resourceId={resource.id}
          recordIds={selectedRecords.map(records => records.id)}
        >
          <Button variant="text">
            <Icon icon={action.icon} />
            {action.label}
          </Button>
        </ActionButton>
      ))}
    </TableCaption>
  )
}

export default SelectedRecords
