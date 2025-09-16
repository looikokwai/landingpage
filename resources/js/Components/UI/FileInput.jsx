import React from 'react';
import { Box, Button, Typography, useTheme } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

const FileInput = ({
  label,
  value,
  onChange,
  error,
  accept,
  helperText,
  ...props
}) => {
  const theme = useTheme();
  const fileInputRef = React.useRef(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (onChange) {
      onChange(file);
    }
  };

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <Box>
      {label && (
        <Typography
          variant="body2"
          sx={{
            mb: 1,
            color: error ? theme.palette.error.main : theme.palette.text.primary,
            fontWeight: 500
          }}
        >
          {label}
        </Typography>
      )}

      <input
        ref={fileInputRef}
        type="file"
        accept={accept}
        onChange={handleFileChange}
        style={{ display: 'none' }}
        {...props}
      />

      <Button
        variant="outlined"
        component="span"
        startIcon={<CloudUploadIcon />}
        onClick={handleButtonClick}
        sx={{
          width: '100%',
          height: 56,
          borderColor: error ? theme.palette.error.main : theme.palette.divider,
          color: error ? theme.palette.error.main : theme.palette.text.primary,
          '&:hover': {
            borderColor: error ? theme.palette.error.dark : theme.palette.primary.main,
            backgroundColor: error ? theme.palette.error.main + '10' : theme.palette.primary.main + '10',
          },
          textTransform: 'none',
          justifyContent: 'flex-start',
          px: 2
        }}
      >
        {value ? value.name : '选择文件'}
      </Button>

      {helperText && (
        <Typography
          variant="caption"
          sx={{
            mt: 0.5,
            display: 'block',
            color: error ? theme.palette.error.main : theme.palette.text.secondary
          }}
        >
          {helperText}
        </Typography>
      )}

      {error && (
        <Typography
          variant="caption"
          sx={{
            mt: 0.5,
            display: 'block',
            color: theme.palette.error.main
          }}
        >
          {error}
        </Typography>
      )}
    </Box>
  );
};

export default FileInput;
