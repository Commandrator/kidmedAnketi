import {Table,TableHead, TableRow,TableCell, TableContainer, TableBody, Radio, Button, Grid, Collapse, Paper} from "@mui/material";
import {useState, useRef, useEffect} from "react";
const Kidmed = ({props}) => {
    const {data}=props;
    const [point, setPoint] = useState(Array(data.length).fill({value:null}));
    const [open, setOpen]=useState(false);
    const [clean, setClean]=useState(false);
    const buttonActive = point.every(data => data.value !== null);
    const [kidmed, setKidmed] = useState({p:0, t:"Kötü diyet kalitesi"});
    const handleButton = () =>{
        if (open){
            setPoint(Array(data.length).fill({value:null}))
            setClean(true)
        }
        else {
            const p = point.reduce((total, obj) => total + obj.value, 0);
            let t ="";
            if (p>=8)
                t="Akdeniz diyetine uygun";            
            else if (p<8 && p>=4)
                t="Orta - Geliştirilmesi gerekli";
            else 
                t="Kötü diyet kalitesi";
            setKidmed({p, t});
            setClean(false)
        }
        setOpen(prev => !prev);
    }
    return (
        <Grid container
        direction="column">
            <Grid item>
                <TableContainer sx={{ height: '100vh', overflow: 'auto', position: 'relative' }}>
                    <Table size="small">
                    <TableHead sx={{ zIndex: 3, position: 'sticky', top: '0px' }}>
                        <TableRow sx={{ backgroundColor: '#bdbdbc' }}>
                        <TableCell />
                        <TableCell>Soru</TableCell>
                        <TableCell>Evet</TableCell>
                        <TableCell>Hayır</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data.map((question) => (
                        <Question key={question.id} question={question} setPoint={setPoint} point={point} clean={clean} />
                        ))}
                    </TableBody>
                    </Table>
                    <div style={{ position: 'sticky', bottom: 0, zIndex: 3, display: 'flex', justifyContent: 'center' }}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Paper elevation={12}>
                        <TableContainer>
                            <Table size="small">
                            <TableHead>
                                <TableRow>
                                <TableCell align="right" sx={{ fontWeight: 'bold' }}>KIDMED INDEX PUANI</TableCell>
                                <TableCell>{kidmed.p}</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                <TableRow>
                                <TableCell align="right" sx={{ fontWeight: 'bold' }}>YORUM</TableCell>
                                <TableCell>{kidmed.t}</TableCell>
                                </TableRow>
                            </TableBody>
                            </Table>
                        </TableContainer>
                        </Paper>
                    </Collapse>
                    </div>
                </TableContainer>
            </Grid>
            <Grid container item justifyContent="flex-end">
                <Button
                    onClick={handleButton}
                    color={open ? "error":"primary"}
                    disabled={!buttonActive}
                    variant="contained">
                    {open ? "Temizle" : "Hesapla"}
                </Button>
            </Grid>
        </Grid>        
    )
}
const Question = ({question, setPoint, clean}) => {
    const [selectedRadio, setSelectedRadio] = useState(null);
    const pointRef = useRef(NaN);
    const handleRadioChange = (id) => {
      switch (id) {
        case 'radio1':
            if (question.req)
                pointRef.current=-1
            else
                pointRef.current=1
            break;
        case 'radio2':
            if (question.req)
                pointRef.current=1
            else
                pointRef.current=-1
            break;
        default:
            break;
      }
      setSelectedRadio(id);
      setPoint(prev => {
        const updatedPoints = [...prev]; // Önceki durumun kopyasını oluşturur
        updatedPoints[question.id-1] = {value:pointRef.current, id}; // Belirli indekse değeri atar
        return updatedPoints; // Güncellenmiş diziyi döndürür
      });
    };
    useEffect(()=>{
        if (clean){
            setSelectedRadio(null)
        }
    },[clean])
    return(
        <TableRow>
            <TableCell align="right">
                {question.id}
            </TableCell>
            <TableCell align="left">
                {question.req ? question.q : `*${question.q}`}
            </TableCell>
            <TableCell>
                <Radio
                size="small"
                name="radio-buttons"
                checked={selectedRadio === 'radio1'}
                onChange={() => handleRadioChange('radio1')}
                />
            </TableCell>
            <TableCell>
                <Radio
                size="small"
                name="radio-buttons"
                checked={selectedRadio === 'radio2'}
                onChange={() => handleRadioChange('radio2')}
                />
            </TableCell>
        </TableRow>
    )
}
export default Kidmed;