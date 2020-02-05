import parser from "bbcode-to-react"
import LineBreakTag from "./LineBreakTag"
import CenterAlignmentTag from "./CenterAlignmentTag"
import CommentTag from "./CommentTag"

parser.registerTag("br", LineBreakTag) // new line tag
parser.registerTag("cent", CenterAlignmentTag) // center tag
parser.registerTag("comment", CommentTag) // comment tag

export default function CustomParser() {
	return parser
}
