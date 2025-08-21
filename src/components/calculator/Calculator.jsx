import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import img from '../assets/img/icon-one/quyosh-panel.svg'
import { Translator, useLang } from '../translator/Translator';

function Calculator() {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const { lang } = useLang();
    const handleShow = () => setShow(true);

    const [region, setRegion] = useState('');
    const [energy, setEnergy] = useState('');
    const [answer, setAnswer] = useState('');

    const handleCalculate = () => {
        const consumption = parseFloat(energy);

        if (!region || isNaN(consumption) || consumption <= 0) {
            setAnswer(lang === 'uz' ? "Iltimos, toʻgʻri maʼlumotlarni kiriting." : "Введите корректные данные.");
            return;
        }

        const sunHours = {
            south: 1600,
            center: 1300,
            north: 1000,
        };

        const efficiency = 0.75;
        const hours = sunHours[region];
        const neededKW = consumption / (hours * efficiency);

        const neededKWText = lang === 'uz' ? 'Taxminan ornatishingiz kerak (kVt)' : 'Вам нужно установить примерно (кВт)';
        const calculatorText = lang === 'uz' ? 'kVt quyosh panellari' : 'кВт солнечных панелей';

        setAnswer(` ${neededKWText} ${neededKW.toFixed(2)} .`);

        // где-то в другом месте (например, кнопка):
        <button>{calculatorText}</button>
    }

    return (
        <>
            <Button variant="primary" onClick={handleShow} style={{ position: 'relative', top: '-15px' }}>
                {lang === 'uz' ? "Xarajat kalkulyatori" : "Калькулятор стоимости"}:
            </Button>

            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title><h2>{lang === 'uz' ? "Xarajat kalkulyatori" : "Калькулятор стоимости"}</h2></Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div style={styles.container}>
                        <h2>{lang === 'uz' ? "Xarajat kalkulyatori" : "Калькулятор стоимости"}</h2>

                        <div style={styles.panel}>
                            <span role="img" aria-label="solar"><img src={img} alt="" /></span>{lang === 'uz' ? "Quyosh paneli" : "Солнечная панель"}
                        </div>

                        <label>{lang === 'uz' ? "Mintaqa" : "Регион"}:</label>
                        <select value={region} onChange={(e) => setRegion(e.target.value)} style={styles.input}>
                            <option value="">{lang === 'uz' ? "Tanlangi" : "Tanlang"}</option>
                            <option value="south">{lang === 'uz' ? "Toshkent" : "Ташкент"}</option>
                            <option value="center">{lang === 'uz' ? "Samarqand viloyati" : "Самарканд область"}</option>
                            <option value="north">{lang === 'uz' ? "Boshqalar" : "Другие"}</option>
                        </select>

                        <label>{lang === 'uz' ? "Yillik iste'mol" : "Годовое потребление"} (кВт·ч):</label>
                        <input
                            type="number"
                            value={energy}
                            onChange={(e) => setEnergy(e.target.value)}
                            placeholder={lang === 'uz' ? "Masalan: 6000" : "Например: 6000"}
                            style={styles.input}
                        />

                        <button onClick={handleCalculate} style={styles.button}>{lang === 'uz' ? "Hisoblash" : "Рассчитать"}</button>

                        {answer && <div style={styles.answer}>{answer}</div>}
                    </div>
                </Modal.Body>
            </Modal>
        </>
    );
}

const styles = {
    container: {
        maxWidth: 400,
        margin: '40px auto',
        padding: 20,
        backgroundColor: '#fff',
        borderRadius: 12,
        boxShadow: '0 0 10px rgba(0,0,0,0.1)',
        fontFamily: 'Arial, sans-serif'
    },
    panel: {
        border: '2px solid #a6dba6',
        borderRadius: 10,
        padding: 10,
        textAlign: 'center',
        marginBottom: 20,
    },
    input: {
        width: '100%',
        padding: 10,
        borderRadius: 8,
        border: '1px solid #ccc',
        marginBottom: 15,
    },
    button: {
        width: '100%',
        padding: 12,
        backgroundColor: '#4CAF50',
        color: '#fff',
        fontSize: 16,
        border: 'none',
        borderRadius: 8,
        cursor: 'pointer',
    },
    result: {
        marginTop: 15,
        fontWeight: 'bold',
        color: '#333',
    }
};

export default Calculator;