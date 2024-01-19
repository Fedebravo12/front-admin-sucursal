import React from 'react';
import Box from '@mui/material/Box';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import { esES } from '@mui/x-data-grid';


import { GridActionsCellItem } from '@mui/x-data-grid';

const GenericTable = ({ rows, columns, getRowId, onDelete, onDetail }) => {
  return (
    <Box sx={{ height: 600, width: 1, display: 'grid' }}>
      <DataGrid
        localeText={esES.components.MuiDataGrid.defaultProps.localeText}

        initialState={{
          pagination: { paginationModel: { pageSize: 10 } },
        }}
        pageSizeOptions={[10, 20, 30]}
        rows={rows}
        columns={columns}
        getRowId={getRowId}
        disableColumnFilter
        disableColumnSelector
        disableDensitySelector
        components={{ Toolbar: GridToolbar }}
        componentsProps={{
          toolbar: {
            showQuickFilter: true,
          },
        }}

      />
    </Box>
  );
};

export default GenericTable;
