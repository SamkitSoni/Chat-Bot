import { TextField } from "@mui/material";

type Props = {
    name: string,
    type: string,
    label: string
};

const CustomizedInput = (props: Props) => {
    return <TextField margin="normal" InputLabelProps={{style: {color: "white"}}}
    name={props.name} label={props.label} type={props.type} 
    InputProps={{style: {width: "400px", color: "white", borderRadius: 10, fontSize: 20}}}/>
};

export default CustomizedInput;