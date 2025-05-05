import { useEffect, useRef, useState } from 'react';
import {
    TextField,
    InputAdornment,
    IconButton,
    Popper,
    Paper,
    List,
    ListItem,
    ListItemText,
    ClickAwayListener,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';
import axios from 'axios';

interface IData {
    symbol: string;
    name: string;
}

const SearchBar = () => {
    const [searchText, setSearchText] = useState('');
    const [results, setResults] = useState<IData[]>([]);
    const [open, setOpen] = useState(false);
    const anchorRef = useRef<HTMLDivElement | null>(null);

    // Debounce input
    useEffect(() => {
        const delayDebounce = setTimeout(() => {
            if (searchText.trim() !== '') {
                fetchSymbols(searchText);
            } else {
                setResults([]);
                setOpen(false);
            }
        }, 500);

        return () => clearTimeout(delayDebounce);
    }, [searchText]);

    const fetchSymbols = async (query: string) => {
        try {
            const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/v1/symbol`, {
                params: {
                    symbol: query,
                    limit: 10,
                    page: 1,
                },
            });
            setResults(res.data.results);
            setOpen(true);
        } catch (err) {
            console.error('Error fetching symbols:', err);
            setOpen(false);
        }
    };

    const handleClear = () => {
        setSearchText('');
        setResults([]);
        setOpen(false);
    };

    const handleSelect = (item: IData) => {
        setSearchText(item.symbol);
        setOpen(false);
    };

    return (
        <ClickAwayListener onClickAway={() => setOpen(false)}>
            <div ref={anchorRef}>
                <TextField
                    variant="outlined"
                    size="small"
                    placeholder="Search symbol..."
                    value={searchText}
                    onChange={(e) => setSearchText(e.target.value)}
                    onFocus={() => results.length > 0 && setOpen(true)}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                {searchText && (
                                    <IconButton onClick={handleClear}>
                                        <ClearIcon />
                                    </IconButton>
                                )}
                                <SearchIcon />
                            </InputAdornment>
                        ),
                    }}
                    fullWidth
                />

                <Popper
                    open={open}
                    anchorEl={anchorRef.current}
                    placement="bottom-start"
                    style={{ zIndex: 1300, width: anchorRef.current?.offsetWidth }}
                >
                    <Paper elevation={3}>
                        <List dense>
                            {results && results.map((item, index) => (
                                <ListItem
                                    component="div"
                                    key={index}
                                    onClick={() => handleSelect(item)}
                                >
                                    <ListItemText
                                        primary={item.symbol}
                                        secondary={item.name}
                                    />
                                </ListItem>

                            ))}
                        </List>
                    </Paper>
                </Popper>
            </div>
        </ClickAwayListener>
    );
};

export default SearchBar;
